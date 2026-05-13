// src/services/auth.service.ts
import api from '@/lib/axios';
import type { AxiosResponse } from 'axios';
import type { RegisterFormData, User } from '@/types';
import { getCurrencyFromCountry } from './currency.service';

// =============================================
// REGISTER USER
// =============================================
export const registerUser = async (data: RegisterFormData): Promise<User> => {
  const response: AxiosResponse = await api.post('/auth/register', {
    firstName: data.firstName,
    secondName: data.secondName,
    email: data.email,
    idNumber: data.idNumber,
    country: data.country,
    password: data.password,
  });

  const { user, session } = response.data.data;

  console.log('Registered user:', user);

  localStorage.setItem('access_token', session.access_token);
  localStorage.setItem('refresh_token', session.refresh_token);

  return {
    uid: user.id,
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
    idNumber: data.idNumber,
    country: data.country,
    currency: getCurrencyFromCountry(data.country),
    createdAt: new Date().toISOString(),
    paymentMade: false,
  };
};

// =============================================
// LOGIN USER
// =============================================
export const loginUser = async (email: string, password: string): Promise<User> => {
  const response: AxiosResponse = await api.post('/auth/login', { email, password });

  const { user, session } = response.data.data;

  localStorage.setItem('access_token', session.access_token);
  localStorage.setItem('refresh_token', session.refresh_token);

  return {
    uid: user.id,
    email: user.email,
    firstName: user.firstName || '',
    secondName: user.secondName || '',
    idNumber: user.idNumber || '',
    country: user.country || '',
    currency: getCurrencyFromCountry(user.country || ''),
    createdAt: user.createdAt || new Date().toISOString(),
    paymentMade: user.paymentMade ?? false,
    purposes: user.purposes,
    crbReportId: user.crbReportId,
  };
};

// =============================================
// GET CURRENT USER  — calls /auth/me
// =============================================
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

    if (!token) return null;
    const response: AxiosResponse = await api.get('/auth/me');
    const u = response.data.data.user;

    return {
      uid: u.id,
      email: u.email,
      firstName: u.firstName || '',
      secondName: u.secondName || '',
      idNumber: u.idNumber || '',
      country: u.country || '',
      currency: getCurrencyFromCountry(u.country || ''),
      paymentMade: u.paymentMade ?? false,
      createdAt: u.createdAt || new Date().toISOString(),
      purposes: u.purposes,
      crbReportId: u.crbReportId,
      reportUrl: u.reportUrl,
      reportGeneratedAt: u.reportGeneratedAt,
    };
  } catch {
    return null;
  }
};

// =============================================
// UPDATE PROFILE
// =============================================
export const updateProfile = async (
  uid: string,
  data: { firstName?: string; secondName?: string; idNumber?: string; country?: string }
): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.put('/user/update', { uid, ...data });
    const u = response.data.data;

    return {
      uid: u.id,
      email: u.email,
      firstName: u.firstName || '',
      secondName: u.secondName || '',
      idNumber: u.idNumber || '',
      country: u.country || '',
      currency: getCurrencyFromCountry(u.country || ''),
      paymentMade: u.paymentMade ?? false,
      createdAt: u.createdAt || new Date().toISOString(),
      purposes: u.purposes,
      crbReportId: u.crbReportId,
    };
  } catch {
    return null;
  }
};

// =============================================
// SUBSCRIBE TO AUTH CHANGES (token-based)
// =============================================
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  let cancelled = false;

  const check = async () => {
    if (cancelled) return;
    const user = await getCurrentUser();
    if (!cancelled) callback(user);
  };

  check();

  const onStorage = (e: StorageEvent) => {
    if (e.key === 'access_token') check();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }

  return () => {
    cancelled = true;
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
};

// =============================================
// REFRESH TOKEN
// =============================================
export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) throw new Error('No refresh token');

  const response: AxiosResponse = await api.post('/auth/refresh', { refresh_token });
  const { session } = response.data.data;

  localStorage.setItem('access_token', session.access_token);
  localStorage.setItem('refresh_token', session.refresh_token);

  return session.access_token;
};

// =============================================
// LOGOUT
// =============================================
export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
