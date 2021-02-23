import { renderHook } from '@testing-library/react-hooks';

import { useIntervalWithInitialCbCall } from './useIntervalWithInitialCbCall';
import { Currencies } from '../const';

const depsOptions = {} as never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let callback: any;

beforeEach(() => {
  callback = jest.fn();
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  callback.mockRestore();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should init hook with custom delay', () => {
  const { result } = renderHook(() => useIntervalWithInitialCbCall(callback, 5000, depsOptions));

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
});

it('should not call hook if delay is null', () => {
  const { result } = renderHook(() => useIntervalWithInitialCbCall(callback, null, depsOptions));

  expect(result.current).toBeUndefined();
  expect(setInterval).not.toHaveBeenCalled();
});

it('should immediately call callback', () => {
  renderHook(() => useIntervalWithInitialCbCall(callback, 500, depsOptions));
  expect(callback).toHaveBeenCalledTimes(1);
});

it('should call hook cb immediately and run interval custom delay', () => {
  const { result } = renderHook(() => useIntervalWithInitialCbCall(callback, 500, depsOptions));
  expect(callback).toHaveBeenCalledTimes(1);

  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 500);
});

it('should clear interval on unmount', () => {
  const { unmount } = renderHook(() => useIntervalWithInitialCbCall(callback, 200, depsOptions));
  expect(clearInterval).not.toHaveBeenCalled();

  unmount();

  expect(clearInterval).toHaveBeenCalledTimes(1);
});

it('should handle new immediately call when delay is updated', () => {
  let delay = 200;
  const { rerender } = renderHook(() =>
    useIntervalWithInitialCbCall(callback, delay, {
      isSellingBase: true,
      baseCurrency: Currencies.GBP,
      targetCurrency: Currencies.USD,
    })
  );
  expect(callback).toHaveBeenCalledTimes(1);

  delay = 500;
  rerender();

  expect(callback).toHaveBeenCalledTimes(1);
});
