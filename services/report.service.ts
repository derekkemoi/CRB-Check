// src/services/report.service.ts
import api from '@/lib/axios';
import { mapCRBReport } from '@/lib/mapCRBReport';
import type { AxiosResponse } from 'axios';

export const fetchLatestReport = async () => {
  const response: AxiosResponse = await api.get('/report/me/latest');
  return mapCRBReport(response.data.data);
};

export const fetchCRBReport = async (reportId: string) => {
  const response: AxiosResponse = await api.get(`/report/${reportId}`);
  return mapCRBReport(response.data.data);
};
