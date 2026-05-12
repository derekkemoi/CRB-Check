export interface User {
  uid: string;
  email: string;
  firstName: string;
  secondName: string;
  idNumber: string;
  country: string;
  currency: string;
  createdAt: string;
  paymentMade: boolean;
  purposes?: string[];
  reportUrl?: string;
  crbReportId?: string;
  reportGeneratedAt?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export interface RegisterFormData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmPassword: string;
  idNumber: string;
  country: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PurposeFormData {
  purposes: string[];
}

export interface PaymentData {
  amount: number;
  email: string;
  reference: string;
}

export interface CRBReport {
  report_id: string;
  user_id: string;
  generated_at: string;
  expires_at: string;
  country: string;
  currency: string;
  score: number;
  score_category: string;
  score_color: string;
  credit_bureau: string;
  banks: string[];
  personal_info: {
    fullName: string;
    idNumber: string;
    address: string;
  };
  summary: string;
  advice: string[];
  disclaimer: string;
  payment_reference: string;
  purpose?: string[];           // Optional, since it may be added later
  created_at?: string;
  updated_at?: string;
}
