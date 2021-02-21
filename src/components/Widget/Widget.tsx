import React, { useCallback, useReducer, useState } from 'react';

import { useIntervalWithInitialCbCall } from '../../hooks';
import { getTargetCurrencyRate } from '../../services/exchangeRateService';
import { Currencies, CURRENCY_SIGNS, REFRESH_INTERVAL } from '../../const';
import {
  INPUT_VALUE_AMOUNT_REGEX,
  fixLeadingZeroes,
  round,
  VALUES_EXCLUDED_FROM_EXCHANGE,
  getRate,
  getBaseInputRate,
  getTargetInputRate,
} from '../../helpers';
import {
  setExchangeRate,
  setTargetCurrency,
  setBaseCurrency,
  setBaseInputValue,
  setIsSellingBase,
  setTargetInputValue,
  clearInputs,
} from './currenciesWidgetState/currenciesWidgetActions';
import {
  currenciesExchangeReducer,
  currenciesExchangeInitialState,
  CurrenciesWidgetActions,
} from './currenciesWidgetState/currenciesWidgetReducer';
import { exchange } from './walletState/walletActions';
import { walletInitialState, walletReducer } from './walletState/walletReducer';
import { CurrencyRow } from '..';
import { ReactComponent as ArrowSvg } from '../../assets/arrow.svg';
import * as S from './Widget.styles';

type OnInputChangeArgs = {
  value: string;
  baseCb: (value: string) => CurrenciesWidgetActions;
  targetCb: (value: string) => CurrenciesWidgetActions;
  targetInput?: boolean;
};

type OnSetAllFundsArgs = {
  currency: Currencies;
  baseCb: (value: string) => CurrenciesWidgetActions;
  targetCb: (value: string) => CurrenciesWidgetActions;
  rateCb: (isSellingBase: boolean, exchangeRate: number) => number;
};

export const Widget: React.FC = () => {
  const [currenciesState, currenciesDispatch] = useReducer(
    currenciesExchangeReducer,
    currenciesExchangeInitialState
  );
  const [walletState, walletDispatch] = useReducer(walletReducer, walletInitialState);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    baseCurrency,
    baseInputValue,
    exchangeRate,
    isSellingBase,
    targetCurrency,
    targetInputValue,
  } = currenciesState;

  useIntervalWithInitialCbCall(
    async () => {
      try {
        const base = isSellingBase ? baseCurrency : targetCurrency;
        const target = isSellingBase ? targetCurrency : baseCurrency;
        const rate = await getTargetCurrencyRate(base, target);

        currenciesDispatch(setExchangeRate(rate));
      } catch (err) {
        setErrorMessage('Failed to fetch ratesapi, please try again later');
      }
    },
    REFRESH_INTERVAL,
    { isSellingBase, baseCurrency, targetCurrency }
  );

  const closeErrorMessage = useCallback(() => setErrorMessage(''), []);

  const onBaseCurrencyChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
    currenciesDispatch(setBaseCurrency(value as Currencies));

  const onTargetCurrencyChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
    currenciesDispatch(setTargetCurrency(value as Currencies));

  const updateInputs = useCallback(
    ({ value, baseCb, targetCb, targetInput = false }: OnInputChangeArgs) => {
      const formattedValue = fixLeadingZeroes(value);
      currenciesDispatch(baseCb(formattedValue));

      if (!VALUES_EXCLUDED_FROM_EXCHANGE.includes(formattedValue)) {
        const rate = getRate({ isSellingBase, exchangeRate, targetInput });
        currenciesDispatch(targetCb(String(round(parseFloat(formattedValue) * rate))));
      } else {
        currenciesDispatch(targetCb(''));
      }
    },
    [exchangeRate, isSellingBase]
  );

  const onInputChange = useCallback(
    ({ value, baseCb, targetCb, targetInput = false }: OnInputChangeArgs) => {
      if (value === '') {
        return currenciesDispatch(clearInputs());
      }

      if (value === '.') {
        return currenciesDispatch(baseCb('0.'));
      }

      if (INPUT_VALUE_AMOUNT_REGEX.test(value)) {
        updateInputs({
          value,
          baseCb,
          targetCb,
          targetInput,
        });
      } else if (value.startsWith('-') || value.startsWith('+')) {
        const valueWithoutSign = value.slice(1);

        if (valueWithoutSign === '') {
          return currenciesDispatch(clearInputs());
        }

        if (INPUT_VALUE_AMOUNT_REGEX.test(valueWithoutSign)) {
          updateInputs({
            value: valueWithoutSign,
            baseCb,
            targetCb,
            targetInput,
          });
        }
      }

      return undefined;
    },
    [updateInputs]
  );

  const onBaseInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange({
      value,
      baseCb: setBaseInputValue,
      targetCb: setTargetInputValue,
    });
  };

  const onTargetInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange({
      value,
      baseCb: setTargetInputValue,
      targetCb: setBaseInputValue,
      targetInput: true,
    });
  };

  const setAvailableFunds = useCallback(
    ({ currency, baseCb, targetCb, rateCb }: OnSetAllFundsArgs) => {
      if (!walletState[currency] || walletState[currency] === 0) {
        return;
      }

      currenciesDispatch(baseCb(`${walletState[currency]}`));
      currenciesDispatch(
        targetCb(`${round(walletState[currency]! * rateCb(isSellingBase, exchangeRate))}`)
      );
    },
    [exchangeRate, isSellingBase, walletState]
  );

  const setAllAvailableBaseFunds = () =>
    setAvailableFunds({
      currency: baseCurrency,
      baseCb: setBaseInputValue,
      targetCb: setTargetInputValue,
      rateCb: getBaseInputRate,
    });

  const setAllAvailableTargetFunds = () =>
    setAvailableFunds({
      currency: targetCurrency,
      baseCb: setTargetInputValue,
      targetCb: setBaseInputValue,
      rateCb: getTargetInputRate,
    });

  const onExchange = () => {
    walletDispatch(
      exchange({
        [baseCurrency]: isSellingBase
          ? round((walletState[baseCurrency] || 0) - parseFloat(baseInputValue))
          : round((walletState[baseCurrency] || 0) + parseFloat(baseInputValue)),
        [targetCurrency]: isSellingBase
          ? round((walletState[targetCurrency] || 0) + parseFloat(targetInputValue))
          : round((walletState[targetCurrency] || 0) - parseFloat(targetInputValue)),
      })
    );

    currenciesDispatch(clearInputs());
  };

  const handleOperationChange = () => currenciesDispatch(setIsSellingBase());

  const baseCurrencySign = CURRENCY_SIGNS[baseCurrency];
  const targetCurrencySign = CURRENCY_SIGNS[targetCurrency];

  const operation = isSellingBase ? 'Sell' : 'Buy';

  const isExchangeAmountProvided =
    parseFloat(baseInputValue) > 0 && parseFloat(targetInputValue) > 0;
  const isSufficientFunds = isSellingBase
    ? parseFloat(baseInputValue) <= (walletState[baseCurrency] || 0)
    : parseFloat(targetInputValue) <= (walletState[targetCurrency] || 0);

  return (
    <S.Container>
      {errorMessage && (
        <S.ErrorMessage>
          {errorMessage} <span onClick={closeErrorMessage}>x</span>
        </S.ErrorMessage>
      )}
      <S.Title>
        {operation} {baseCurrency}
      </S.Title>
      <S.MarketOrder>
        Market order <span>at</span> 1{baseCurrencySign} ={' '}
        {isSellingBase ? exchangeRate : round(1 / exchangeRate, 4)} {targetCurrencySign}
      </S.MarketOrder>
      <CurrencyRow
        currency={baseCurrency}
        currencySign={baseCurrencySign}
        inputValue={baseInputValue}
        isSellingBase={isSellingBase}
        isSufficientFunds={isSufficientFunds}
        onCurrencyChange={onBaseCurrencyChange}
        onInputChange={onBaseInputChange}
        setAllAvailableFunds={setAllAvailableBaseFunds}
        walletState={walletState}
      />
      <S.TransactionSwap className={!isSellingBase ? 'upside' : ''} onClick={handleOperationChange}>
        <ArrowSvg />
      </S.TransactionSwap>
      <CurrencyRow
        isTargetRow
        currency={targetCurrency}
        currencySign={targetCurrencySign}
        inputValue={targetInputValue}
        isSellingBase={isSellingBase}
        isSufficientFunds={isSufficientFunds}
        onCurrencyChange={onTargetCurrencyChange}
        onInputChange={onTargetInputChange}
        setAllAvailableFunds={setAllAvailableTargetFunds}
        walletState={walletState}
      />
      <S.Block>
        <S.ExchangeButton
          disabled={!isExchangeAmountProvided || !isSufficientFunds}
          onClick={onExchange}
        >
          {operation} {baseCurrency} {isSellingBase ? 'for' : 'with'} {targetCurrency}
        </S.ExchangeButton>
      </S.Block>
    </S.Container>
  );
};
