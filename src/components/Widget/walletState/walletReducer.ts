import { Currencies } from '../../../const';
import { EXCHANGE } from './walletTypes';

export type WalletState = Partial<Record<Currencies, number>>;
export type WalletAction = {
  type: typeof EXCHANGE;
  payload: Partial<Record<Currencies, number>>;
};

export const walletInitialState = {
  [Currencies.USD]: 1000,
  [Currencies.EUR]: 500,
};

export const walletReducer = (
  state: WalletState,
  { type, payload }: WalletAction
): WalletState => {
  switch (type) {
    case EXCHANGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
