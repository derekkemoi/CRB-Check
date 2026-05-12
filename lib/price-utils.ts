import { BASE_PRICE_USD, BASE_PRICE_KES, CURRENCY_SYMBOLS } from './constants';

export interface PriceInfo {
  amount: number;
  currency: string;
  symbol: string;
  displayPrice: string;
  amountInSmallestUnit: number;
}

export function getPriceByCountry(country: string): PriceInfo {
  const isKenya = country === 'Kenya';

  if (isKenya) {
    return {
      amount: BASE_PRICE_KES,
      currency: 'KES',
      symbol: CURRENCY_SYMBOLS.KES,
      displayPrice: `${CURRENCY_SYMBOLS.KES} ${BASE_PRICE_KES}`,
      amountInSmallestUnit: BASE_PRICE_KES * 100,
    };
  }

  return {
    amount: BASE_PRICE_USD,
    currency: 'USD',
    symbol: CURRENCY_SYMBOLS.USD,
    displayPrice: `${CURRENCY_SYMBOLS.USD}${BASE_PRICE_USD}`,
    amountInSmallestUnit: Math.floor(BASE_PRICE_USD * 100),
  };
}

export function formatPrice(country: string): string {
  const priceInfo = getPriceByCountry(country);
  return priceInfo.displayPrice;
}
