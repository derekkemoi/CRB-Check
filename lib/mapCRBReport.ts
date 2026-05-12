// src/utils/mapCRBReport.ts
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
    banks: api.banks,
    personalInfo: api.personal_info,
    summary: api.summary,
    advice: api.advice,
    disclaimer: api.disclaimer,
    paymentReference: api.payment_reference,
    purpose: api.purpose,
  };
}