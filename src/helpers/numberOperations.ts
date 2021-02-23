export const round = (value: number, precision = 2): number => {
  const factor = 10 ** precision;

  return Math.round(value * factor) / factor;
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
