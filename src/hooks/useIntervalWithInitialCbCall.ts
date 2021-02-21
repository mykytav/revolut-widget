import { useRef, useEffect } from 'react';

import { Currencies } from '../const';

type CbDependencies = {
  isSellingBase: boolean;
  baseCurrency: Currencies;
  targetCurrency: Currencies;
};

export const useIntervalWithInitialCbCall = (
  callback: () => void,
  delay: number,
  { isSellingBase, baseCurrency, targetCurrency }: CbDependencies
): void => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedCallback.current!();
  }, [isSellingBase, targetCurrency, baseCurrency]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const fn = () => savedCallback.current!();

    if (delay !== null) {
      const id = setInterval(fn, delay);
      return () => clearInterval(id);
    }
  }, [delay, isSellingBase, targetCurrency, baseCurrency]);
};
