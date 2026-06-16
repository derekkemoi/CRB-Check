import api from '@/lib/axios';
import { mapCRBReport } from '@/lib/mapCRBReport';
import type { AxiosResponse } from 'axios';
import type { CRBReport, CRBReportAPI } from '@/types';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export type FetchReportResult =
  | { success: true; report: CRBReport }
  | { 
      success: false; 
      error: string; 
      requiresGeneration?: boolean; 
      requiresPayment?: boolean;
    };

export interface GenerateReportResponse {
  reportId: string;
  paymentStatus: string;
}

/**
 * Fetch latest CRB Report
 * Endpoint: GET /report
 */
export const fetchReport = async (): Promise<FetchReportResult> => {
  try {
    const response: AxiosResponse<ApiResponse<CRBReportAPI>> = await api.get('/report');

    const { success, message, data } = response.data;

    if (!success) {
      const errorMsg = message || 'Failed to fetch report';

      // No report exists yet
      if (message?.toLowerCase().includes('no report found') || 
          message?.toLowerCase().includes('generate a report first')) {
        return {
          success: false,
          error: errorMsg,
          requiresGeneration: true,
        };
      }

      // Payment required
      if (message?.toLowerCase().includes('payment required')) {
        return {
          success: false,
          error: errorMsg,
          requiresPayment: true,
        };
      }

      return { 
        success: false, 
        error: errorMsg 
      };
    }

    if (!data) {
      return { 
        success: false, 
        error: 'No report data received' 
      };
    }

    const mappedReport = mapCRBReport(data);
    return {
      success: true,
      report: mappedReport,
    };
  } catch (error: any) {
    console.error('Error fetching report:', error);
    
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      'Failed to fetch report';

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Generate a new CRB Report
 * Endpoint: POST /report/generate
 */
export const generateReport = async (): Promise<GenerateReportResponse> => {
  try {
    const response: AxiosResponse<ApiResponse<{ reportId: string; paymentStatus: string }>> = 
      await api.post('/report/generate');

    const { success, message, data } = response.data;

    if (!success) {
      throw new Error(message || 'Failed to generate report');
    }

    if (!data?.reportId) {
      throw new Error('No report ID returned from API');
    }

    return {
      reportId: data.reportId,
      paymentStatus: data.paymentStatus || 'pending',
    };
  } catch (error: any) {
    console.error('Error generating report:', error);
    throw error; // Let the calling component handle the error
  }
};