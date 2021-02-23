import { currenciesExchangeReducer } from './currenciesWidgetReducer';
import * as actions from './currenciesWidgetActions';
import { Currencies } from '../../../const';

const initialState = {
  baseCurrency: Currencies.USD,
  baseInputValue: '',
  exchangeRate: 0,
  isSellingBase: true,
  targetCurrency: Currencies.EUR,
  targetInputValue: '',
};

describe('currenciesWidgetReducer', () => {
  it('should handle SET_EXCHANGE_RATE action', () => {
    const newState = currenciesExchangeReducer(initialState, actions.setExchangeRate(1.23));

    expect(newState).toStrictEqual({
      ...initialState,
      exchangeRate: 1.23,
    });
  });

  it('should handle SET_BASE_CURRENCY action', () => {
    const newState = currenciesExchangeReducer(
      initialState,
      actions.setBaseCurrency(Currencies.JPY)
    );

    expect(newState).toStrictEqual({
      ...initialState,
      baseCurrency: Currencies.JPY,
    });
  });

  it('should handle SET_BASE_INPUT_VALUE action', () => {
    const newState = currenciesExchangeReducer(initialState, actions.setBaseInputValue('1000'));

    expect(newState).toStrictEqual({
      ...initialState,
      baseInputValue: '1000',
    });
  });

  it('should handle SET_IS_SELLING_BASE action', () => {
    const newState = currenciesExchangeReducer(initialState, actions.setIsSellingBase());

    expect(newState).toStrictEqual({
      ...initialState,
      isSellingBase: !initialState.isSellingBase,
    });
  });

  it('should handle SET_TARGET_CURRENCY action', () => {
    const newState = currenciesExchangeReducer(
      initialState,
      actions.setTargetCurrency(Currencies.RUB)
    );

    expect(newState).toStrictEqual({
      ...initialState,
      targetCurrency: Currencies.RUB,
    });
  });

  it('should handle SET_TARGET_INPUT_VALUE action', () => {
    const newState = currenciesExchangeReducer(initialState, actions.setTargetInputValue('0.50'));

    expect(newState).toStrictEqual({
      ...initialState,
      targetInputValue: '0.50',
    });
  });

  it('should handle CLEAR_INPUTS action', () => {
    const newState = currenciesExchangeReducer(initialState, actions.clearInputs());

    expect(newState).toStrictEqual({
      ...initialState,
      baseInputValue: '',
      targetInputValue: '',
    });
  });

  it('should handle unknown action', () => {
    const newState = currenciesExchangeReducer(initialState, { type: 'UNKNOWN' } as never);

    expect(newState).toStrictEqual(initialState);
  });
});
