import { round } from '../helpers';
import { Currencies, RATES_API_URL } from '../const';

export const getTargetCurrencyRate = async (
  baseCurrency: Currencies,
  targetCurrency: Currencies
): Promise<number> => {
  const response = await fetch(`${RATES_API_URL}?base=${baseCurrency}&symbols=${targetCurrency}`);

  if (!response.ok) {
    throw new Error(
      `Cannot fetch rates for ${baseCurrency}, api respond with status ${response.status}`
    );
  }

  const rateData = await response.json();

  return round(rateData.rates[targetCurrency], 4);
};
