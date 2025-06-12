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
  id: number;
  year: string;
  name: string;
  date: string;
  location?: string;
}

export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  date: string;
}