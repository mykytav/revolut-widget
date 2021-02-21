import { Currencies } from '../../../const';
import * as types from './currenciesWidgetTypes';

type CurrenciesExchangeState = typeof currenciesExchangeInitialState;
export type CurrenciesWidgetActions =
  | { type: typeof types.SET_EXCHANGE_RATE; payload: number }
  | { type: typeof types.SET_BASE_CURRENCY; payload: Currencies }
  | { type: typeof types.SET_BASE_INPUT_VALUE; payload: string }
  | { type: typeof types.SET_IS_SELLING_BASE }
  | { type: typeof types.SET_TARGET_CURRENCY; payload: Currencies }
  | { type: typeof types.SET_TARGET_INPUT_VALUE; payload: string }
  | { type: typeof types.CLEAR_INPUTS };

export const currenciesExchangeInitialState = {
  baseCurrency: Currencies.USD,
  baseInputValue: '',
  exchangeRate: 0,
  isSellingBase: true,
  targetCurrency: Currencies.EUR,
  targetInputValue: '',
};

export const currenciesExchangeReducer = (
  state: CurrenciesExchangeState,
  action: CurrenciesWidgetActions
): CurrenciesExchangeState => {
  switch (action.type) {
    case types.SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case types.SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload,
        baseInputValue: '',
        targetCurrency:
          action.payload === state.targetCurrency
            ? state.baseCurrency
            : state.targetCurrency,
        targetInputValue: '',
      };
    case types.SET_BASE_INPUT_VALUE:
      return {
        ...state,
        baseInputValue: action.payload,
      };
    case types.SET_TARGET_CURRENCY:
      return {
        ...state,
        baseCurrency:
          action.payload === state.baseCurrency
            ? state.targetCurrency
            : state.baseCurrency,
        baseInputValue: '',
        targetCurrency: action.payload,
        targetInputValue: '',
      };
    case types.SET_TARGET_INPUT_VALUE:
      return {
        ...state,
        targetInputValue: action.payload,
      };
    case types.SET_IS_SELLING_BASE:
      return {
        ...state,
        isSellingBase: !state.isSellingBase,
      };
    case types.CLEAR_INPUTS:
      return {
        ...state,
        baseInputValue: '',
        targetInputValue: '',
      };
    default:
      return state;
  }
};
