import {
  BASE_PRICE_USD,
  EXCHANGE_RATE_API_URL,
  CURRENCY_SYMBOLS,
  COUNTRY_TO_CURRENCY
} from '@/lib/constants';

interface ExchangeRateResponse {
  result: string;
  rates: Record<string, number>;
  time_last_update_unix: number;
}

interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;

let cachedRates: CachedRates | null = null;

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return cachedRates.rates;
  }

  try {
    const response = await fetch(EXCHANGE_RATE_API_URL);
    const data: ExchangeRateResponse = await response.json();

    if (data.result === 'success' && data.rates) {
      cachedRates = {
        rates: data.rates,
        timestamp: Date.now(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('exchangeRates', JSON.stringify(cachedRates));
      }

      return data.rates;
    }

    throw new Error('Failed to fetch exchange rates');
  } catch (error) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exchangeRates');
      if (stored) {
        const parsed = JSON.parse(stored) as CachedRates;
        cachedRates = parsed;
        return parsed.rates;
      }
    }

    throw error;
  }
}

export function getCurrencyFromCountry(country: string): string {
  return COUNTRY_TO_CURRENCY[country] || 'USD';
}

export function removeDecimals(amount: number): number {
  return Math.floor(amount);
}

export async function convertUSDToLocalCurrency(
  currencyCode: string
): Promise<number> {
  const rates = await fetchExchangeRates();
  const rate = rates[currencyCode] || 1;
  const amount = BASE_PRICE_USD * rate;
  return removeDecimals(amount);
}

export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  const wholeAmount = Math.floor(amount);

  if (currencyCode === 'USD' || currencyCode === 'GBP' || currencyCode === 'EUR') {
    return `${symbol}${wholeAmount}`;
  }

  return `${symbol} ${wholeAmount}`;
}

export function convertToSmallestUnit(amount: number, currencyCode: string): number {
  const wholeAmount = Math.floor(amount);
  return wholeAmount * 100;
}

export async function getPriceInUserCurrency(currencyCode: string): Promise<{
  amount: number;
  formattedAmount: string;
  amountInSmallestUnit: number;
}> {
  const amount = await convertUSDToLocalCurrency(currencyCode);
  const formattedAmount = formatCurrency(amount, currencyCode);
  const amountInSmallestUnit = convertToSmallestUnit(amount, currencyCode);

  return {
    amount,
    formattedAmount,
    amountInSmallestUnit,
  };
}

export function initializeExchangeRates(): void {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('exchangeRates');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CachedRates;
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          cachedRates = parsed;
        }
      } catch (error) {
        console.error('Error parsing stored exchange rates:', error);
      }
    }

    fetchExchangeRates().catch(console.error);
  }
}
