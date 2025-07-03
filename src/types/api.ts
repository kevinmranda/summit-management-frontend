export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
    is_admin: boolean;
  };
}

export interface RegisterResponse {
  message: string;
}

export interface IDCardResponse {
  id?: number; // Returned by generateIDCard
  pdf_path: string; // Returned by generateIDCard and getIDCard
}

export interface ScanMealResponse {
  success: boolean;
  message: string;
}

// Enhanced QR Scan Response to match backend
export interface QRScanResponse {
  success: boolean;
  message: string;
  user_info?: {
    id: number;
    full_name: string;
    email: string;
    university: string;
    conference: string;
    zone: string;
    branch: string;
  };
  meal_info?: {
    id: number;
    user_id: number;
    summit_id: number;
    meal_type: string;
    consumed_at: string;
    location?: string;
  };
  error_code?: string;
  data?: any;
}

// Payment Response Types
export interface PaymentInitiateResponse {
  success: boolean;
  message: string;
  transaction_id?: string;
  payment_id?: number;
}

// Report Response Types
export interface PaymentReportResponse {
  payments: PaymentReportEntry[];
  summary: {
    total_payments: number;
    total_amount: number;
    completed_count: number;
    pending_count: number;
    failed_count: number;
    completion_rate: number;
  };
}

export interface PaymentReportEntry {
  user_id: number;
  full_name: string;
  email: string;
  summit_id: number;
  summit_name: string;
  amount: number;
  status: string;
  provider: string;
  paid_at?: string;
  created_at: string;
}