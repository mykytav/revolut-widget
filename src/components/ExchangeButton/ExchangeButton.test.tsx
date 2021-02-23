import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ExchangeButton } from './ExchangeButton';
import { Currencies } from '../../const';

describe('ExchangeButton', () => {
  it('should render disabled button', () => {
    const onExchange = jest.fn();

    render(
      <ExchangeButton
        baseCurrency={Currencies.JPY}
        isExchangeAmountProvided={false}
        isSellingBase={false}
        isSufficientFunds={false}
        onExchange={onExchange}
        operation="Sell"
        targetCurrency={Currencies.GBP}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(screen.getByText(`Sell ${Currencies.JPY} with ${Currencies.GBP}`)).toBeInTheDocument();

    userEvent.click(button);

    expect(onExchange).not.toHaveBeenCalled();
  });

  it('should render enabled button', () => {
    const onExchange = jest.fn();

    render(
      <ExchangeButton
        baseCurrency={Currencies.JPY}
        isExchangeAmountProvided
        isSellingBase={false}
        isSufficientFunds
        onExchange={onExchange}
        operation="Sell"
        targetCurrency={Currencies.GBP}
      />
    );

    const button = screen.getByRole('button');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(onExchange).toHaveBeenCalledTimes(1);
  });

  it('should render button text when buying', () => {
    const onExchange = jest.fn();

    render(
      <ExchangeButton
        baseCurrency={Currencies.JPY}
        isExchangeAmountProvided
        isSellingBase
        isSufficientFunds
        onExchange={onExchange}
        operation="Buy"
        targetCurrency={Currencies.GBP}
      />
    );

    expect(screen.getByText(`Buy ${Currencies.JPY} for ${Currencies.GBP}`)).toBeInTheDocument();
  });
});
