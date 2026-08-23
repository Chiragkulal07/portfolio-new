import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PROJECTS_FILE_PATH = path.join(process.cwd(), "content", "projects.json");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

// Helper to ensure JSON file exists and read it
async function readProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper to write to the JSON file
async function writeProjects(projects: any[]) {
  await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    if (imageFile && imageFile.size > 0) {
      // Create images folder if not exists
      await fs.mkdir(IMAGES_DIR, { recursive: true });

      const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
      const extension = path.extname(imageFile.name) || ".jpg";
      const filename = `${Date.now()}-${safeTitle}${extension}`;
      const filePath = path.join(IMAGES_DIR, filename);

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/images/${filename}`;
    }

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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    const projectToDelete = projects.find((p: any) => p.id === id);

    if (!projectToDelete) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Attempt to delete the image file if it's not the placeholder
    if (projectToDelete.imageUrl && projectToDelete.imageUrl.startsWith("/images/") && !projectToDelete.imageUrl.includes("codeconnect.jpg")) {
      const filename = projectToDelete.imageUrl.replace("/images/", "");
      const filePath = path.join(IMAGES_DIR, filename);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.error("Failed to delete image file:", err);
      }
    }

    const updatedProjects = projects.filter((p: any) => p.id !== id);
    await writeProjects(updatedProjects);

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
