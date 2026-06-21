export const BASE_PRICE_USD = 1.00;
export const USD_TO_KES_RATE = 100;
export const BASE_PRICE_KES = Math.floor(BASE_PRICE_USD * USD_TO_KES_RATE);

export const EXCHANGE_RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  KES: 'Ksh',
  TZS: 'Tsh',
  UGX: 'UGX',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  ZAR: 'R',
  NGN: '₦',
  GHS: 'GH₵',
  AED: 'د.إ',
  SAR: 'SR',
  BRL: 'R$',
  MXN: 'MX$',
  KRW: '₩',
};

export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'Canada': 'CAD',
  'Germany': 'EUR',
  'Australia': 'AUD',
  'Singapore': 'SGD',
  'South Korea': 'KRW',
  'India': 'INR',
  'Brazil': 'BRL',
  'South Africa': 'ZAR',
  'Kenya': 'KES',
  'United Arab Emirates (UAE)': 'AED',
  'Mexico': 'MXN',
};
