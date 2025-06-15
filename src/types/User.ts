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
  date: string;
  venue: string;
  ministers?: string;
  clothing?: string;
  description?: string;
}


export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  date: string;
}