import { EXCHANGE } from './walletTypes';
import { Currencies } from '../../../const';
import { WalletAction } from './walletReducer';

export const exchange = (
  wallets: Partial<Record<Currencies, number>>
): WalletAction => ({
  type: EXCHANGE,
  payload: wallets,
});
