import { removeLeadingZeroes, stringifyWithLastZero, addSign } from './inputValueOperations';

describe('inputValueOperations', () => {
  describe('removeLeadingZeroes', () => {
    it('should remove leading zeros from string', () => {
      expect(removeLeadingZeroes('0002')).toBe('2');
      expect(removeLeadingZeroes('0')).toBe('0');
      expect(removeLeadingZeroes('')).toBe('0');
      expect(removeLeadingZeroes('00200')).toBe('200');
      expect(removeLeadingZeroes('00200.03')).toBe('200.03');
      expect(removeLeadingZeroes('0200.3')).toBe('200.3');
    });
  });

  describe('stringifyWithLastZero', () => {
    it('add 0 to numbers with single digit after dot', () => {
      expect(stringifyWithLastZero(12.3)).toBe('12.30');
      expect(stringifyWithLastZero(1.23)).toBe('1.23');
      expect(stringifyWithLastZero(20)).toBe('20');
      expect(stringifyWithLastZero(0)).toBe('0');
      expect(stringifyWithLastZero(0.0)).toBe('0');
      expect(stringifyWithLastZero(0.0)).toBe('0');
    });
  });

  describe('addSing', () => {
    it('add sign base on input and operation', () => {
      expect(addSign('100', true, false)).toBe('-100');
      expect(addSign('100', true, true)).toBe('+100');
      expect(addSign('100', false, false)).toBe('+100');
      expect(addSign('100', false, true)).toBe('-100');
      expect(addSign('', false, true)).toBe('');
    });
  });
});
