export const INPUT_VALUE_AMOUNT_REGEX = /^\d*\.?[0-9]{0,2}$/;

export const VALUES_EXCLUDED_FROM_EXCHANGE = ['', '0', '0.', '0.0', '0.00', '.0', '.00'];

export const removeLeadingZeroes = (value: string): string => {
  const valueWithout0 = value.replace(/^(0(?!\.))+/, '');

  return valueWithout0 === '' ? '0' : valueWithout0;
};

export const stringifyWithLastZero = (value: number): string => {
  const decimalPart = String(value).split('.')[1];

  if (decimalPart && decimalPart.length === 1) {
    return `${value}0`;
  }

  return String(value);
};

export const addSign = (value: string, isSellingBase: boolean, isTargetRow?: boolean): string => {
  if (!value) return value;

  if (isTargetRow) {
    return isSellingBase ? `+${value}` : `-${value}`;
  }

  return isSellingBase ? `-${value}` : `+${value}`;
};
