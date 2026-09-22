import { NextRequest, NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

const PROJECTS_FILE_PATH = path.join(process.cwd(), "content", "projects.json");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const PROJECTS_BLOB_PATH = "portfolio/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

function getStorageErrorStatus(error: unknown) {
  return getErrorMessage(error).includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
}

function ensureVercelStorageConfigured() {
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Project storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel project settings.");
  }
}

async function readProjects(): Promise<Project[]> {
  ensureVercelStorageConfigured();

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { blobs } = await list({ prefix: PROJECTS_BLOB_PATH, limit: 1 });
    const projectBlob = blobs.find((blob) => blob.pathname === PROJECTS_BLOB_PATH);

    if (projectBlob) {
      const response = await fetch(projectBlob.url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to read projects from Vercel Blob.");
      }
      return (await response.json()) as Project[];
    }
  }

  try {
    const data = await fs.readFile(PROJECTS_FILE_PATH, "utf-8");
    return JSON.parse(data) as Project[];
  } catch {
    return [];
  }
}

async function writeProjects(projects: Project[]) {
  ensureVercelStorageConfigured();

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(PROJECTS_BLOB_PATH, JSON.stringify(projects, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }

  await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

async function storeImage(imageFile: File, title: string) {
  ensureVercelStorageConfigured();

  const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  const extension = path.extname(imageFile.name) || ".jpg";
  const filename = `${Date.now()}-${safeTitle}${extension}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`portfolio/images/${filename}`, imageFile, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  await fs.mkdir(IMAGES_DIR, { recursive: true });
  const filePath = path.join(IMAGES_DIR, filename);
  const arrayBuffer = await imageFile.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  return `/images/${filename}`;
}

async function deleteImage(imageUrl: string) {
  if (!imageUrl || imageUrl.includes("codeconnect.jpg")) return;

  if (imageUrl.startsWith("http") && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await del(imageUrl);
    } catch (error) {
      console.error("Failed to delete blob image:", error);
    }
    return;
  }

  if (imageUrl.startsWith("/images/")) {
    try {
      await fs.unlink(path.join(IMAGES_DIR, imageUrl.replace("/images/", "")));
    } catch (error) {
      console.error("Failed to delete image file:", error);
    }
  }
}

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: getStorageErrorStatus(error) });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const liveUrl = (formData.get("liveUrl") as string) || "";
    const githubUrl = (formData.get("githubUrl") as string) || "";
    const featured = formData.get("featured") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    let imageUrl = "/images/codeconnect.jpg"; // default fallback

    if (imageFile && imageFile.size > 0) imageUrl = await storeImage(imageFile, title);

    const projects = await readProjects();
    const id = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-") + "-" + Date.now().toString().slice(-4);
    
    const tags = tagsString
      ? tagsString.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
      : [];

    const newProject = {
      id,
      title,
      description,
      tags,
      imageUrl,
      liveUrl,
      githubUrl,
      featured,
    };

    projects.push(newProject);
    await writeProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: getStorageErrorStatus(error) });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const liveUrl = (formData.get("liveUrl") as string) || "";
    const githubUrl = (formData.get("githubUrl") as string) || "";
    const featured = formData.get("featured") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    const projects = await readProjects();
    const projectIndex = projects.findIndex((project: Project) => project.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const existingProject = projects[projectIndex];
    let imageUrl = existingProject.imageUrl;

    if (imageFile && imageFile.size > 0) imageUrl = await storeImage(imageFile, title);

    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const updatedProject = {
      ...existingProject,
      title,
      description,
      tags,
      imageUrl,
      liveUrl,
      githubUrl,
      featured,
    };

    projects[projectIndex] = updatedProject;
    await writeProjects(projects);

    if (imageUrl !== existingProject.imageUrl) await deleteImage(existingProject.imageUrl);

    return NextResponse.json(updatedProject);
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: getStorageErrorStatus(error) });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const projects = await readProjects();
    const projectToDelete = projects.find((project: Project) => project.id === id);

    if (!projectToDelete) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await deleteImage(projectToDelete.imageUrl);

    const updatedProjects = projects.filter((project: Project) => project.id !== id);
    await writeProjects(updatedProjects);

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: getStorageErrorStatus(error) });
  }
}
