export type ProjectVisual = 'chat' | 'construction' | 'management' | 'retail'

export interface Project {
  number: string
  slug: string
  name: string
  category: string
  summary: string
  year?: string
  stack: string[]
  accent: string
  visual: ProjectVisual
  overview: string
  contribution: string
  technicalApproach: string
  features: string[]
  demoUrl?: string
  sourceUrl?: string
}

export interface PortfolioProfile {
  name: string
  role: string
  introduction: string
  about: string
  availability: string
  githubUrl: string
  linkedinUrl: string
  email: string
  resumeUrl: string
  siteUrl: string
}
