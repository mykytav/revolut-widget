export const round = (value: number, precision = 2): number => {
  const factor = 10 ** precision;

  return Math.round(value * factor) / factor;
};

export const fixLeadingZeroes = (value: string): string => {
  const valueWithout0 = value.replace(/^(0(?!\.))+/, '');

  return valueWithout0 === '' ? '0' : valueWithout0;
};

export const getTargetInputRate = (isSellingBase: boolean, exchangeRate: number): number =>
  isSellingBase ? round(1 / exchangeRate, 4) : exchangeRate;

export const getBaseInputRate = (isSellingBase: boolean, exchangeRate: number): number =>
  isSellingBase ? exchangeRate : round(1 / exchangeRate, 4);

type GetRateArgs = {
  exchangeRate: number;
  isSellingBase: boolean;
  targetInput: boolean;
};

export const getRate = ({ exchangeRate, isSellingBase, targetInput }: GetRateArgs): number => {
  if (targetInput) {
    return getTargetInputRate(isSellingBase, exchangeRate);
  }
  return getBaseInputRate(isSellingBase, exchangeRate);
};

export const INPUT_VALUE_AMOUNT_REGEX = /^\d*\.?[0-9]{0,2}$/;

export const VALUES_EXCLUDED_FROM_EXCHANGE = ['', '0', '0.', '0.0', '0.00', '.0', '.00'];
