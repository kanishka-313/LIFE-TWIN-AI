/**
 * Central API client. All requests to the FastAPI backend go through here —
 * do not scatter raw fetch() calls across pages/components.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TOKEN_STORAGE_KEY = "lifetwin_access_token";

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

async function request<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: finalHeaders });
  } catch {
    throw new ApiError("Could not reach the server. Please check your connection.", "NETWORK_ERROR", 0);
  }

  let body: any = null;
  try {
    body = await response.json();
  } catch {
    // no body / not JSON
  }

  if (!response.ok) {
    const message = body?.message || body?.detail?.message || "Something went wrong";
    const code = body?.code || body?.detail?.code || "UNKNOWN_ERROR";
    throw new ApiError(message, code, response.status);
  }

  return body as T;
}

export interface UserOut {
  id: string;
  full_name: string;
  email: string;
  is_email_verified: boolean;
  has_password: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: UserOut;
  warning?: string;
}

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export interface SignupData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  medical_history?: string | null;
  allergies?: string | null;
  family_history?: string | null;
}

export interface HealthProfile {
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  medical_history: string | null;
  allergies: string | null;
  family_history: string | null;
}

export interface HealthProfileUpdate {
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  medical_history?: string | null;
  allergies?: string | null;
  family_history?: string | null;
}

export const api = {
  auth: {
    signup: (data: SignupData) =>
      request<TokenResponse>("/auth/signup", { method: "POST", body: JSON.stringify(data), auth: false }),

    login: (data: { email: string; password: string }) =>
      request<TokenResponse>("/auth/login", { method: "POST", body: JSON.stringify(data), auth: false }),

    me: () => request<UserOut>("/auth/me", { method: "GET" }),

    googleLoginUrl: () =>
      request<{ auth_url: string }>("/auth/google/login", { method: "GET", auth: false }),

    forgotPassword: (email: string) =>
      request<{ success: boolean; message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        auth: false,
      }),

    verifyOtp: (email: string, otp: string, purpose = "password_reset") =>
      request<{ success: boolean; message: string }>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp, purpose }),
        auth: false,
      }),

    resetPassword: (data: {
      email: string;
      otp: string;
      new_password: string;
      confirm_new_password: string;
    }) =>
      request<{ success: boolean; message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        auth: false,
      }),
  },

  health: {
    getProfile: () => request<HealthProfile | null>("/health/profile", { method: "GET" }),

    updateProfile: (data: HealthProfileUpdate) =>
      request<HealthProfile>("/health/profile", { method: "PUT", body: JSON.stringify(data) }),
  },
};

export default api;
