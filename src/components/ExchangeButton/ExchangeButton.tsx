import React from 'react';

import * as S from './ExchangeButton.styles';
import { Block } from '../Widget/Widget.styles';
import { Currencies } from '../../const';

type ExchangeButtonProps = {
  baseCurrency: Currencies;
  isExchangeAmountProvided: boolean;
  isSellingBase: boolean;
  isSufficientFunds: boolean;
  onExchange: () => void;
  operation: 'Sell' | 'Buy';
  targetCurrency: Currencies;
};

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({
  baseCurrency,
  isSellingBase,
  isSufficientFunds,
  isExchangeAmountProvided,
  onExchange,
  operation,
  targetCurrency,
}) => {
  return (
    <Block>
      <S.ExchangeButton
        disabled={!isExchangeAmountProvided || !isSufficientFunds}
        onClick={onExchange}
      >
        {operation} {baseCurrency} {isSellingBase ? 'for' : 'with'} {targetCurrency}
      </S.ExchangeButton>
    </Block>
  );
};
