
export interface User {
  uid: string;
  email: string;
  firstName: string;
  secondName: string;
  idNumber: string;
  country: string;
  createdAt: string;
  currency: string;
  paymentMade: 'pending' | 'paid';
  currentReportId?: string | null;
  reportGeneratedAt?: string | null;
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

export interface CRBReportAPI {
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

  summary: string;
  disclaimer: string;

  payment_reference: string | null;

  report_data: {
    active_loans: ActiveLoanAPI[];
    closed_loans: ClosedLoanAPI[];

    report_status: {
      credit_status: string;
    };

    credit_summary: {
      active_loans: number;
      closed_loans: number;
      credit_score: number;
      negative_records: number;
      total_outstanding_debt: number;
    };

    recommendations: string[];

    credit_inquiries: CreditInquiryAPI[];

    negative_records: unknown[];

    credit_utilization: {
      total_limit: number;
      used_credit: number;
      utilization_percentage: number;
    };

    credit_score_details: {
      grade: string;
      score: number;
      risk_level: string;
    };
  };

  created_at: string;
  updated_at: string;
}

export interface ActiveLoanAPI {
  lender: string;
  loan_id: string;
  loan_type: string;
  opened_at: string;
  original_amount: number;
  repayment_status: string;
  outstanding_balance: number;
}

export interface ClosedLoanAPI {
  amount: number;
  lender: string;
  loan_id: string;
  closed_date: string;
  repayment_status: string;
}

export interface CreditInquiryAPI {
  purpose: string;
  inquiry_id: string;
  institution: string;
  inquiry_date: string;
}

export interface CRBReport {
  reportId: string;
  userId: string;

  generatedAt: string;
  expiresAt: string;

  country: string;
  currency: string;

  score: number;
  scoreCategory: string;
  scoreColor: string;

  creditBureau: string;

  summary: string;
  disclaimer: string;

  paymentReference?: string | null;

  reportData: {
  activeLoans: ActiveLoan[];
  closedLoans: ClosedLoan[];

  reportStatus: {
    creditStatus: string;
  };

  creditSummary: {
    activeLoans: number;
    closedLoans: number;
    creditScore: number;
    negativeRecords: number;
    totalOutstandingDebt: number;
  };

  recommendations: string[];

  creditInquiries: CreditInquiry[];

  negativeRecords: unknown[];

  creditUtilization: {
    totalLimit: number;
    usedCredit: number;
    utilizationPercentage: number;
  };

  creditScoreDetails: {
    grade: string;
    score: number;
    riskLevel: string;
  };
};
}

export interface ActiveLoan {
  lender: string;
  loanId: string;
  loanType: string;
  openedAt: string;
  originalAmount: number;
  repaymentStatus: string;
  outstandingBalance: number;
}

export interface ClosedLoan {
  amount: number;
  lender: string;
  loanId: string;
  closedDate: string;
  repaymentStatus: string;
}

export interface CreditInquiry {
  purpose: string;
  inquiryId: string;
  institution: string;
  inquiryDate: string;
}
