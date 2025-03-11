export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceSection {
  title: string;
  description: string;
  items: Service[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  icon?: string
}

export interface PestType {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
  icon?: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ServicePageContent {
  hero: {
    title: string
    description: string
    image?: string
  }
  categories: ServiceCategory[]
  pestTypes: PestType[]
  process: {
    title: string
    steps: ProcessStep[]
  }
  features: {
    title: string
    items: Feature[]
  }
} 