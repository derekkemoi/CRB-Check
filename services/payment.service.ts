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
    callback_url,
  });

  return response.data.data || response.data;
};

// =============================================
// VERIFY PAYMENT
// =============================================
export const verifyPayment = async (
  reference: string
) => {
  const response: AxiosResponse = await api.post(
    '/payment/verify',
    {
      reference
    }
  );

  return response.data.data || response.data;
};