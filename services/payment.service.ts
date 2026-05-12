// src/services/payment.service.ts
import api from '@/lib/axios';
import type { AxiosResponse } from 'axios';

// =============================================
// INITIATE PAYMENT
// =============================================
export const initiatePayment = async (
  uid: string,
  email: string,
  amount: number,
  currency: string = 'KES',
  callback_url?: string
) => {
  const response: AxiosResponse = await api.post('/payment/initiate', {
    uid,
    email,
    amount,                    // Backend will multiply by 100
    currency,
    callback_url,              // Optional - important for production
  });

  return response.data.data || response.data;
};

// =============================================
// VERIFY PAYMENT + GENERATE REPORT
// =============================================
export const verifyPayment = async (reference: string, uid: string) => {
  const response: AxiosResponse = await api.post('/payment/verify', {
    reference,
    uid,
  });

  return response.data.data || response.data; // Returns full CRB Report
};

// =============================================
// UPDATE PURPOSES (after report is generated)
// =============================================
export const updateReportPurposes = async (uid: string, purposes: string[]) => {
  const response: AxiosResponse = await api.post('/purpose', {
    uid,
    purposes,
  });

  return response.data.data || response.data;
};

// =============================================
// GET LATEST REPORT (Best for Dashboard)
// =============================================
export const getLatestReport = async () => {
  const response: AxiosResponse = await api.get('/report/me/latest');
  return response.data.data;
};

// =============================================
// GET REPORT BY ID
// =============================================
export const getReportById = async (reportId: string) => {
  const response: AxiosResponse = await api.get(`/report/${reportId}`);
  return response.data.data;
};