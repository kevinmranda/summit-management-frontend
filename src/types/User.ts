export interface User {
  id: number;
  full_name: string;
  email: string;
  university: string;
  conference: string;
  zone: string;
  branch: string;
  is_admin?: boolean;
}

export interface Summit {
  ID: number;
  year: string;
  name: string;
  theme?: string;
  date: string;
  start_date: string;
  end_date: string;
  venue: string;

  // Staff and Leadership
  ministers?: string;
  moderators?: string;
  preachers?: string;

  // Event Details
  activities?: string;
  schedule?: string;
  clothing?: string;
  description?: string;

  // Media
  poster_image?: string;
  gallery_images?: string; // JSON array of image URLs

  // Configuration
  is_active: boolean;
  max_capacity: number;
  price: number;

  // Contact Information
  contact_email?: string;
  contact_phone?: string;
}


export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  date: string;
}