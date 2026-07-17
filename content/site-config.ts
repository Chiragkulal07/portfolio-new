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
  title: "Product Designer & Frontend Developer",
  tagline: "Crafting thoughtful digital experiences with modern web technologies.",
  bio: "I am a multidisciplinary creator focused on building polished, user-centered products that blend design and engineering.",
  email: "hello@chirag.dev",
  location: "Remote · Available worldwide",
  resumeUrl: "/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/chirag",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/chirag",
    icon: "linkedin",
  },
  {
    label: "Dribbble",
    url: "https://dribbble.com/chirag",
    icon: "dribbble",
  },
];

export const projects: Project[] = [
  {
    id: "codeconnect",
    title: "CodeConnect",
    description:
      "A real-time collaborative code editor that lets multiple developers write, edit, and debug code together instantly using Socket.io.",
    tags: ["Socket.io", "Node.js", "React", "Real-time Collaboration"],
    imageUrl: "/images/codeconnect.jpg",
    liveUrl: "",
    githubUrl: "https://github.com/Karthikshettyhub/codeconnnect.git",
    featured: true,
  },
  {
    id: "mock-project-1",
    title: "Nexus Dashboard (Mock)",
    description:
      "A mock analytics dashboard added temporarily to test the scroll-linked sticky card stacking effect. It features data visualization and customizable widgets.",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Recharts"],
    imageUrl: "/images/codeconnect.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "mock-project-2",
    title: "Aura E-Commerce (Mock)",
    description:
      "Another mock project for testing the stacking effect. A modern, high-performance headless e-commerce storefront with complex filtering.",
    tags: ["React", "Shopify Storefront API", "TypeScript"],
    imageUrl: "/images/codeconnect.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Design",
    items: ["UI Design", "Design Systems", "Prototyping", "Visual Hierarchy"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Product",
    items: ["User Research", "Wireframing", "Cross-functional Collaboration", "Product Thinking"],
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
    duration: "Jan 31, 2026",
    description:
      "Secured runner-up position in a hackathon competition.",
  },
  {
    role: "Hackathon Runner-Up",
    company: "Sahyadri College Hackathon",
    duration: "Jul 11, 2026",
    description:
      "Secured runner-up position in a hackathon competition.",
  },
];

export const siteConfig = {
  title: "Chirag Portfolio",
  description: "Personal portfolio website",
};
