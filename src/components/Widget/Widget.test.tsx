import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Widget } from './Widget';
import { getTargetCurrencyRate } from '../../services/exchangeRateService';
import { Currencies } from '../../const';

const mockRatePromise = Promise.resolve();

jest.mock('../../services/exchangeRateService', () => ({
  getTargetCurrencyRate: jest.fn(() => mockRatePromise),
}));

describe('Widget', () => {
  beforeEach(() => {
    (getTargetCurrencyRate as jest.Mock).mockImplementation(() => 0.8282);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render Widget, initially fetch rate and then fetch each 10s', async () => {
    render(<Widget />);

    expect(getTargetCurrencyRate).toHaveBeenCalledTimes(1);
    expect(getTargetCurrencyRate).toHaveBeenCalledWith(Currencies.USD, Currencies.EUR);

    await act(() => mockRatePromise);

    jest.advanceTimersByTime(10001);

    expect(getTargetCurrencyRate).toHaveBeenCalledTimes(2);
    expect(getTargetCurrencyRate).toHaveBeenCalledWith(Currencies.USD, Currencies.EUR);

    await act(() => mockRatePromise);
  });

  it('should render Widget, initially fetch rate and fetch again on swatTransaction btn click, updating interval', async () => {
    render(<Widget />);

    expect(getTargetCurrencyRate).toHaveBeenCalledTimes(1);
    expect(getTargetCurrencyRate).toHaveBeenCalledWith(Currencies.USD, Currencies.EUR);

    await act(() => mockRatePromise);

    const swapTransactionBtn = screen.getByTestId('swap-transaction');

    userEvent.click(swapTransactionBtn);

    expect(getTargetCurrencyRate).toHaveBeenCalledTimes(2);
    expect(getTargetCurrencyRate).toHaveBeenCalledWith(Currencies.EUR, Currencies.USD);

    await act(() => mockRatePromise);

    jest.advanceTimersByTime(10001);

    expect(getTargetCurrencyRate).toHaveBeenCalledTimes(3);
    expect(getTargetCurrencyRate).toHaveBeenCalledWith(Currencies.EUR, Currencies.USD);

    await act(() => mockRatePromise);
  });

  it('should render title, rates and signs for sell and buy transaction', async () => {
    render(<Widget />);

    await act(() => mockRatePromise);

    expect(screen.getByRole('heading', { name: /sell usd/i })).toBeInTheDocument();
    expect(screen.getByText(/market order 1\$ = 0\.8282 €/i)).toBeInTheDocument();

    const swapTransactionBtn = screen.getByTestId('swap-transaction');

    userEvent.click(swapTransactionBtn);

    await act(() => mockRatePromise);

    expect(screen.getByRole('heading', { name: /buy usd/i })).toBeInTheDocument();
    expect(screen.getByText(/market order 1\$ = 1\.2074 €/i)).toBeInTheDocument();
  });

  it('should render change both input values, signs and show error', async () => {
    render(<Widget />);

    await act(() => mockRatePromise);

    const [baseInput, targetInput] = screen.queryAllByRole('textbox');

    userEvent.type(baseInput, '1000');

    expect(baseInput).toHaveValue('-1000');
    expect(targetInput).toHaveValue('+828.20');

    const swapTransactionBtn = screen.getByTestId('swap-transaction');

    userEvent.click(swapTransactionBtn);

    await act(() => mockRatePromise);

    expect(baseInput).toHaveValue('+1000');
    expect(targetInput).toHaveValue('-828.20');

    expect(screen.getByText('exceed balance')).toBeInTheDocument();
  });

  it('should render change wallet amounts when click on exchange button', async () => {
    render(<Widget />);

    await act(() => mockRatePromise);

    const [baseInput, targetInput] = screen.queryAllByRole('textbox');

    userEvent.type(baseInput, '1000');

    expect(baseInput).toHaveValue('-1000');
    expect(targetInput).toHaveValue('+828.20');

    const exchangeBtn = screen.getByRole('button', { name: /sell usd for eur/i });

    userEvent.click(exchangeBtn);

    expect(baseInput).toHaveValue('');
    expect(targetInput).toHaveValue('');

    expect(screen.getByText(/0 \$/i)).toBeInTheDocument();
    expect(screen.getByText(/1328\.20 €/i)).toBeInTheDocument();
  });

  it('should show error when fetch failed', async () => {
    (getTargetCurrencyRate as jest.Mock).mockImplementation(() => {
      throw new Error('Api error');
    });

    render(<Widget />);

    expect(
      screen.getByText('Failed to fetch ratesapi, please try again later')
    ).toBeInTheDocument();

    const closeErrBtn = screen.getByTestId('close-error-msg');

    userEvent.click(closeErrBtn);

    expect(screen.queryAllByText('Failed to fetch ratesapi, please try again later').length).toBe(
      0
    );
  });
});
