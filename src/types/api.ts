export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  message: string;
}

export interface IDCardResponse {
  id?: number; // Returned by generateIDCard
  pdf_path: string; // Returned by generateIDCard and getIDCard
}