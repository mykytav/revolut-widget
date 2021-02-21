import React from 'react';

import { Currencies, CURRENCY_SIGNS } from '../../const';
import { ReactComponent as ArrowDownSvg } from '../../assets/downArrow.svg';
import { WalletState } from '../Widget/walletState/walletReducer';
import * as S from './CurrencyRow.styles';
import { Block } from '../Widget/Widget.styles';

type CurrencyRowProps = {
  currency: Currencies;
  currencySign: string;
  inputValue: string;
  isSellingBase: boolean;
  isSufficientFunds: boolean;
  isTargetRow?: boolean;
  onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAllAvailableFunds: () => void;
  walletState: WalletState;
};

const addSing = (value: string, isSellingBase: boolean, isTargetRow?: boolean): string => {
  if (!value) return value;

  if (isTargetRow) {
    return isSellingBase ? `+${value}` : `-${value}`;
  }

  return isSellingBase ? `-${value}` : `+${value}`;
};

export const CurrencyRow: React.FC<CurrencyRowProps> = ({
  currency,
  currencySign,
  inputValue,
  isSellingBase,
  isSufficientFunds,
  isTargetRow,
  onCurrencyChange,
  onInputChange,
  setAllAvailableFunds,
  walletState,
}) => {
  return (
    <S.CurrencyRow>
      <Block width="50%">
        <S.SelectWrapper>
          <S.Select value={currency} onChange={onCurrencyChange}>
            {Object.keys(CURRENCY_SIGNS).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </S.Select>
          <ArrowDownSvg />
        </S.SelectWrapper>
        <S.Balance>
          {currency} balance: &nbsp;
          <span onClick={setAllAvailableFunds}>
            {walletState[currency] || 0} {currencySign}
          </span>
        </S.Balance>
      </Block>
      <Block alignItems="flex-end" width="50%">
        <S.Input
          onChange={onInputChange}
          placeholder="0"
          type="text"
          value={addSing(inputValue, isSellingBase, isTargetRow)}
        />
        {inputValue && (isTargetRow ? !isSellingBase : isSellingBase) && !isSufficientFunds && (
          <S.Error>exceed balance</S.Error>
        )}
      </Block>
    </S.CurrencyRow>
  );
};
