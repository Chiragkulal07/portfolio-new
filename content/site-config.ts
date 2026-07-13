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

export interface ExperienceItem {
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
    id: "aurora-dashboard",
    title: "Aurora Dashboard",
    description:
      "A data-rich analytics experience for a SaaS platform with a focus on clarity and usability.",
    tags: ["Next.js", "TypeScript", "Design Systems"],
    imageUrl: "/images/aurora-dashboard.jpg",
    liveUrl: "https://example.com/aurora-dashboard",
    githubUrl: "https://github.com/chirag/aurora-dashboard",
    featured: true,
  },
  {
    id: "studio-archive",
    title: "Studio Archive",
    description:
      "A storytelling-focused portfolio platform for a creative studio with immersive interactions.",
    tags: ["React", "Framer Motion", "Content Design"],
    imageUrl: "/images/studio-archive.jpg",
    liveUrl: "https://example.com/studio-archive",
    githubUrl: "https://github.com/chirag/studio-archive",
    featured: true,
  },
  {
    id: "north-star",
    title: "North Star Commerce",
    description:
      "An ecommerce redesign that improved navigation, conversion flow, and product discovery.",
    tags: ["UI/UX", "Tailwind", "Performance"],
    imageUrl: "/images/north-star.jpg",
    liveUrl: "https://example.com/north-star",
    githubUrl: "https://github.com/chirag/north-star",
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

export const experience: ExperienceItem[] = [
  {
    role: "Senior Product Designer",
    company: "Northstar Labs",
    duration: "2022 — Present",
    description:
      "Leading product design for a B2B analytics platform, shaping the end-to-end experience and design system.",
  },
  {
    role: "Frontend Developer",
    company: "Studio North",
    duration: "2020 — 2022",
    description:
      "Built modern, responsive web experiences for clients in fintech, education, and creative industries.",
  },
  {
    role: "Visual Designer",
    company: "Freelance",
    duration: "2018 — 2020",
    description:
      "Delivered brand, website, and digital campaign assets for startups and independent founders.",
  },
];

export const siteConfig = {
  title: "Chirag Portfolio",
  description: "Personal portfolio website",
};
