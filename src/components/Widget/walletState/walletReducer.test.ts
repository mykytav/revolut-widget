import { walletReducer } from './walletReducer';
import { exchange } from './walletActions';
import { Currencies } from '../../../const';

describe('walletReducer', () => {
  it('should set baseCurrencyWallet and targetCurrencyWallet to provided value', () => {
    const initialState = {
      [Currencies.USD]: 100,
      [Currencies.EUR]: 100,
    };

    const newState = walletReducer(
      initialState,
      exchange({
        [Currencies.USD]: 50,
        [Currencies.EUR]: 150,
      })
    );

    expect(newState[Currencies.USD]).toBe(50);
    expect(newState[Currencies.EUR]).toBe(150);
  });

  it('should merge state with payload', () => {
    const initialState = {
      [Currencies.USD]: 100,
      [Currencies.EUR]: 100,
    };

    const newState = walletReducer(
      initialState,
      exchange({
        [Currencies.USD]: 50,
        [Currencies.GBP]: 50,
      })
    );

    expect(newState[Currencies.USD]).toBe(50);
    expect(newState[Currencies.EUR]).toBe(100);
    expect(newState[Currencies.GBP]).toBe(50);
  });
});
