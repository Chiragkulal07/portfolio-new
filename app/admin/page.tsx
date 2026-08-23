"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Trash2, Plus, Upload, Loader2, Sparkles, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        showFeedback("Failed to fetch projects.", "error");
      }
    } catch (err) {
      showFeedback("An error occurred while loading projects.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      showFeedback("Title and description are required.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("liveUrl", liveUrl);
      formData.append("githubUrl", githubUrl);
      formData.append("featured", String(featured));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showFeedback("Project uploaded successfully!", "success");
        // Reset form
        setTitle("");
        setDescription("");
        setTags("");
        setLiveUrl("");
        setGithubUrl("");
        setFeatured(false);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh list
        fetchProjects();
      } else {
        const errorData = await res.json();
        showFeedback(errorData.error || "Failed to create project.", "error");
      }
    } catch (err) {
      showFeedback("An error occurred during submission.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showFeedback("Project deleted successfully.", "success");
        fetchProjects();
      } else {
        const errorData = await res.json();
        showFeedback(errorData.error || "Failed to delete project.", "error");
      }
    } catch (err) {
      showFeedback("An error occurred during deletion.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] left-[20%] h-[800px] w-[800px] rounded-full bg-accent/5 blur-[150px]" />
        <div className="absolute -bottom-[30%] right-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 transition hover:text-foreground mb-3"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-accent bg-clip-text text-transparent flex items-center gap-3">
              Admin Control Panel <Sparkles className="text-accent h-6 w-6 animate-pulse" />
            </h1>
            <p className="text-foreground/60 mt-1">Manage your portfolio projects dynamic content directly from here.</p>
          </div>
        </header>

        {/* Alerts / Feedback Message */}
        {message && (
          <div
            className={`mb-8 flex items-center gap-3 rounded-2xl p-4 border animate-in fade-in slide-in-from-top-4 duration-300 ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            {message.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form Side */}
          <div className="lg:col-span-3">
            <div className="rounded-[2rem] border border-border bg-card/40 backdrop-blur-md p-8 shadow-xl">
              <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                <Plus size={22} className="text-accent" /> Add New Project
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CodeConnect"
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project, technologies used, and your contribution..."
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Next.js, React, Socket.io, Tailwind CSS"
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="liveUrl" className="block text-sm font-semibold text-foreground/80 mb-2">
                      Live Preview Link
                    </label>
                    <input
                      type="url"
                      id="liveUrl"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-semibold text-foreground/80 mb-2">
                      GitHub Repository Link
                    </label>
                    <input
                      type="url"
                      id="githubUrl"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-5 w-5 rounded border-border text-accent focus:ring-accent/50 bg-background"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-foreground/80 select-none">
                    Feature this project on top of the list
                  </label>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-foreground/80 mb-2">Project Image Upload</span>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-accent/50 rounded-2xl p-6 transition flex flex-col items-center justify-center gap-3 cursor-pointer bg-background/20 group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {imagePreview ? (
                      <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner">
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <div className="p-3 bg-muted rounded-full text-foreground/60 group-hover:text-accent group-hover:bg-accent/10 transition">
                          <Upload size={24} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-foreground">Click to upload file</p>
                          <p className="text-xs text-foreground/40 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground font-semibold py-3 px-6 hover:bg-accent/90 disabled:opacity-50 transition active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Uploading project...
                    </>
                  ) : (
                    <>
                      Upload and Publish
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[2rem] border border-border bg-card/40 backdrop-blur-md p-8 shadow-xl">
              <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                Existing Projects ({projects.length})
              </h2>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-foreground/40 gap-3">
                  <Loader2 size={32} className="animate-spin text-accent" />
                  <p className="text-sm">Retrieving projects list...</p>
                </div>
              ) : projects.length === 0 ? (
                <p className="text-center py-12 text-foreground/50 text-sm">No projects uploaded yet.</p>
              ) : (
                <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group flex gap-4 p-3 rounded-2xl border border-border bg-background/30 hover:bg-background/60 transition duration-300"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-border">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 justify-between">
                            <h3 className="font-semibold text-sm text-foreground truncate max-w-[120px] sm:max-w-none">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold tracking-wide uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground/60 line-clamp-2 mt-0.5 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 2).map((t) => (
                              <span key={t} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-foreground/60">
                                {t}
                              </span>
                            ))}
                            {project.tags.length > 2 && (
                              <span className="text-[10px] text-foreground/40 px-1 py-0.5">+{project.tags.length - 2}</span>
                            )}
                          </div>

                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-foreground/40 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition"
                            title="Delete project"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
