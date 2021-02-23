import { useRef, useEffect } from 'react';

import { Currencies } from '../const';

type CbDependencies = {
  isSellingBase: boolean;
  baseCurrency: Currencies;
  targetCurrency: Currencies;
};

export const useIntervalWithInitialCbCall = (
  callback: () => void,
  delay: number | null,
  { isSellingBase, baseCurrency, targetCurrency }: CbDependencies
): void => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedCallback.current!();
  }, [isSellingBase, targetCurrency, baseCurrency]);

  useEffect(() => {
    const fn = () => savedCallback.current!();

    if (delay !== null) {
      const id = setInterval(fn, delay);
      return () => clearInterval(id);
    }

    return undefined;
  }, [delay, isSellingBase, targetCurrency, baseCurrency]);
};
