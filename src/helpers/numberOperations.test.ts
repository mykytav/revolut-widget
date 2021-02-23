import { round, getTargetInputRate, getBaseInputRate, getRate } from './numberOperations';

describe('numberOperations', () => {
  describe('round', () => {
    it('round number to specified precison', () => {
      expect(round(2.5999)).toBe(2.6);
      expect(round(2.5899)).toBe(2.59);
      expect(round(2.11111, 3)).toBe(2.111);
    });
  });

  describe('getBaseInputRate', () => {
    it('it should change rate based on operation type', () => {
      expect(getBaseInputRate(true, 0.8242)).toBe(0.8242);
      expect(getBaseInputRate(false, 0.8242)).toBe(1.2133);
    });
  });

  describe('getTargetInputRate', () => {
    it('it should change rate based on operation type', () => {
      expect(getTargetInputRate(true, 0.8242)).toBe(1.2133);
      expect(getTargetInputRate(false, 0.8242)).toBe(0.8242);
    });
  });

  describe('getRate', () => {
    it('it should change rate based on operation type and target input', () => {
      expect(
        getRate({
          exchangeRate: 0.8242,
          isSellingBase: true,
          targetInput: false,
        })
      ).toBe(0.8242);

      expect(
        getRate({
          exchangeRate: 0.8242,
          isSellingBase: true,
          targetInput: true,
        })
      ).toBe(1.2133);

      expect(
        getRate({
          exchangeRate: 0.8242,
          isSellingBase: false,
          targetInput: false,
        })
      ).toBe(1.2133);

      expect(
        getRate({
          exchangeRate: 0.8242,
          isSellingBase: false,
          targetInput: true,
        })
      ).toBe(0.8242);
    });
  });
});
