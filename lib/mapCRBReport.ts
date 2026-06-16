import type { CRBReport, CRBReportAPI } from '@/types';

export function mapCRBReport(api: CRBReportAPI): CRBReport {
  return {
    reportId: api.report_id,
    userId: api.user_id,

    generatedAt: api.generated_at,
    expiresAt: api.expires_at,

    country: api.country,
    currency: api.currency,

    score: api.score,
    scoreCategory: api.score_category,
    scoreColor: api.score_color,

    creditBureau: api.credit_bureau,

    summary: api.summary,
    disclaimer: api.disclaimer,

    paymentReference: api.payment_reference,

    reportData: {
      activeLoans: api.report_data.active_loans.map((loan) => ({
        lender: loan.lender,
        loanId: loan.loan_id,
        loanType: loan.loan_type,
        openedAt: loan.opened_at,
        originalAmount: loan.original_amount,
        repaymentStatus: loan.repayment_status,
        outstandingBalance: loan.outstanding_balance,
      })),

      closedLoans: api.report_data.closed_loans.map((loan) => ({
        amount: loan.amount,
        lender: loan.lender,
        loanId: loan.loan_id,
        closedDate: loan.closed_date,
        repaymentStatus: loan.repayment_status,
      })),

      reportStatus: {
        creditStatus: api.report_data.report_status.credit_status,
      },

      creditSummary: {
        activeLoans: api.report_data.credit_summary.active_loans,
        closedLoans: api.report_data.credit_summary.closed_loans,
        creditScore: api.report_data.credit_summary.credit_score,
        negativeRecords:
          api.report_data.credit_summary.negative_records,
        totalOutstandingDebt:
          api.report_data.credit_summary.total_outstanding_debt,
      },

      recommendations:
        api.report_data.recommendations,

      creditInquiries:
        api.report_data.credit_inquiries.map((inquiry) => ({
          purpose: inquiry.purpose,
          inquiryId: inquiry.inquiry_id,
          institution: inquiry.institution,
          inquiryDate: inquiry.inquiry_date,
        })),

      negativeRecords:
        api.report_data.negative_records,

      creditUtilization: {
        totalLimit:
          api.report_data.credit_utilization.total_limit,

        usedCredit:
          api.report_data.credit_utilization.used_credit,

        utilizationPercentage:
          api.report_data.credit_utilization.utilization_percentage,
      },

      creditScoreDetails: {
        grade:
          api.report_data.credit_score_details.grade,

        score:
          api.report_data.credit_score_details.score,

        riskLevel:
          api.report_data.credit_score_details.risk_level,
      },
    },
  };
}