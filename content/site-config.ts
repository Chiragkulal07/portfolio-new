export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  resumeUrl: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface StudyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const personalInfo: PersonalInfo = {
  name: "Chirag",
  title: "Full-Stack Developer",
  tagline: "Building real-time, AI-powered web applications with scalable systems.",
  bio: "I am a full-stack developer who enjoys building real-time, AI-powered web applications, from collaborative systems to AI-driven learning tools.",
  email: "chiragkulal877@gmail.com",
  location: "Remote · Available worldwide",
  resumeUrl: "/resume_chirag.docx",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/Chiragkulal07",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/chirag-kulal-0b9b9b328/",
    icon: "linkedin",
  },
  {
    label: "Dribbble",
    url: "https://dribbble.com/chirag",
    icon: "dribbble",
  },
];

import projectsData from "./projects.json";

export const projects: Project[] = projectsData;

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript", "Python", "C", "C++"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Django", "FastAPI", "WebSocket", "Socket.IO", "JWT", "OAuth2"],
  },
  {
    category: "Data & Infrastructure",
    items: ["MongoDB", "Mongoose", "Redis", "AWS", "Docker", "Nginx"],
  },
  {
    category: "AI & Real-Time",
    items: ["Machine Learning", "Deep Learning", "LangGraph", "LangChain", "LLM Integration", "WebRTC", "Pub/Sub Messaging"],
  },
];

export const studies: StudyItem[] = [
  {
    role: "B.E. in Engineering",
    company: "Srinivas Institute of Technology",
    duration: "2024 — 2028",
    description:
      "Pursuing engineering with a focus on Computer Science.",
  },
  {
    role: "Hackathon Runner-Up",
    company: "Aloysius College Hackathon",
    duration: "Jan 2026",
    description:
      "Secured runner-up position in a hackathon competition.",
  },
  {
    role: "Hackathon Runner-Up",
    company: "Sahyadri College Hackathon",
    duration: "Jul 2026",
    description:
      "Secured runner-up position in a hackathon competition.",
  },
];

export const siteConfig = {
  title: "Chirag Portfolio",
  description: "Personal portfolio website",
};
