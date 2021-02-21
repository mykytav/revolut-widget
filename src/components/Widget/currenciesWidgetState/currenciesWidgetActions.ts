import * as types from './currenciesWidgetTypes';
import { Currencies } from '../../../const';
import { CurrenciesWidgetActions } from './currenciesWidgetReducer';

export const setExchangeRate = (rate: number): CurrenciesWidgetActions => ({
  type: types.SET_EXCHANGE_RATE,
  payload: rate,
});

export const setBaseCurrency = (
  currency: Currencies
): CurrenciesWidgetActions => ({
  type: types.SET_BASE_CURRENCY,
  payload: currency,
});

export const setBaseInputValue = (value: string): CurrenciesWidgetActions => ({
  type: types.SET_BASE_INPUT_VALUE,
  payload: value,
});

export const setIsSellingBase = (): CurrenciesWidgetActions => ({
  type: types.SET_IS_SELLING_BASE,
});

export const setTargetCurrency = (
  currency: Currencies
): CurrenciesWidgetActions => ({
  type: types.SET_TARGET_CURRENCY,
  payload: currency,
});

export const setTargetInputValue = (
  value: string
): CurrenciesWidgetActions => ({
  type: types.SET_TARGET_INPUT_VALUE,
  payload: value,
});

export const clearInputs = (): CurrenciesWidgetActions => ({
  type: types.CLEAR_INPUTS,
});
