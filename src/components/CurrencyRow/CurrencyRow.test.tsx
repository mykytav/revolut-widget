import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyRow } from './CurrencyRow';
import { Currencies, CURRENCY_SIGNS } from '../../const';
import { walletInitialState } from '../Widget/walletState/walletReducer';

describe('CurrencyRow', () => {
  it('should call change function for input ', () => {
    const onCurrencyChange = jest.fn();
    const onInputChange = jest.fn();
    const setAllAvailableFunds = jest.fn();

    render(
      <CurrencyRow
        currency={Currencies.USD}
        currencySign={CURRENCY_SIGNS[Currencies.USD]}
        inputValue=""
        isSellingBase={false}
        isSufficientFunds={false}
        onCurrencyChange={onCurrencyChange}
        onInputChange={onInputChange}
        setAllAvailableFunds={setAllAvailableFunds}
        walletState={walletInitialState}
      />
    );

    const input = screen.getByRole('textbox');

    expect(
      screen.getByText(`${walletInitialState[Currencies.USD]} ${CURRENCY_SIGNS[Currencies.USD]}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/usd balance:/i)).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', '0');

    userEvent.type(input, '900');

    expect(onInputChange).toHaveBeenCalledTimes(3);
  });

  it('should call change function for select ', () => {
    const onCurrencyChange = jest.fn();
    const onInputChange = jest.fn();
    const setAllAvailableFunds = jest.fn();

    render(
      <CurrencyRow
        currency={Currencies.USD}
        currencySign={CURRENCY_SIGNS[Currencies.USD]}
        inputValue=""
        isSellingBase={false}
        isSufficientFunds={false}
        onCurrencyChange={onCurrencyChange}
        onInputChange={onInputChange}
        setAllAvailableFunds={setAllAvailableFunds}
        walletState={walletInitialState}
      />
    );

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();

    userEvent.selectOptions(select, screen.getByText(Currencies.GBP));

    expect(onCurrencyChange).toHaveBeenCalledTimes(1);
  });

  it('should call setAllAvailableFunds on balance click ', () => {
    const onCurrencyChange = jest.fn();
    const onInputChange = jest.fn();
    const setAllAvailableFunds = jest.fn();

    render(
      <CurrencyRow
        currency={Currencies.USD}
        currencySign={CURRENCY_SIGNS[Currencies.USD]}
        inputValue=""
        isSellingBase={false}
        isSufficientFunds={false}
        onCurrencyChange={onCurrencyChange}
        onInputChange={onInputChange}
        setAllAvailableFunds={setAllAvailableFunds}
        walletState={walletInitialState}
      />
    );

    const balanceText = screen.getByText(
      `${walletInitialState[Currencies.USD]} ${CURRENCY_SIGNS[Currencies.USD]}`
    );

    userEvent.click(balanceText);

    expect(setAllAvailableFunds).toHaveBeenCalledTimes(1);
  });

  it('should show sign and exceeded balance error', () => {
    const onCurrencyChange = jest.fn();
    const onInputChange = jest.fn();
    const setAllAvailableFunds = jest.fn();

    render(
      <CurrencyRow
        currency={Currencies.USD}
        currencySign={CURRENCY_SIGNS[Currencies.USD]}
        inputValue="10000"
        isSellingBase
        isSufficientFunds={false}
        onCurrencyChange={onCurrencyChange}
        onInputChange={onInputChange}
        setAllAvailableFunds={setAllAvailableFunds}
        walletState={walletInitialState}
      />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('-10000');

    expect(screen.getByText('exceed balance')).toBeInTheDocument();
  });
});
