export type Page =
  | 'home'
  | 'courses'
  | 'landing-communication'
  | 'lead-form'
  | 'article'
  | 'blog'
  // Razorpay Compliance Pages
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-policy'
  | 'shipping-policy'
  | 'contact-us'
  | 'about-us';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  status?: 'active' | 'coming_soon';
  bookingFee?: number;
  totalFee?: number;
  isLocked?: boolean;
  rating?: number;
  isPopular?: boolean;
  category?: string;
  students?: number;
  progress?: number;
}

export interface Lead {
  fullName: string;
  phoneNumber: string;
  isVerified: boolean;
  submittedAt: string; // ISO Date string
}

export interface User {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  title_ml?: string;
  summary_ml?: string;
  content_ml?: string;
}