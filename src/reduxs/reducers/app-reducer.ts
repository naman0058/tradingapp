import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CurrencyEnumType,
  IAppState,
  IPlanBudgetProps,
  ITransactionProps,
  IWalletProps,
} from "types/redux-types";

export const initialState: IAppState = {
  appLoading: false,
  wallets: [],
  currency: CurrencyEnumType.USD,
  budget: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state: IAppState, { payload }: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
    addWallet: (state, action: PayloadAction<IWalletProps>) => {
      state.wallets.push(action.payload);
    },
    setCurrency: (state, { payload }: PayloadAction<CurrencyEnumType>) => {
      state.currency = payload;
    },
    updateWallet: (
      state,
      action: PayloadAction<{ wallet: IWalletProps }>
    ) => {
      const { wallet } = action.payload;
      const walletIndex = state.wallets.findIndex(
        (w) => w.id === wallet.id
      );
      if (walletIndex !== -1) {
        state.wallets[walletIndex] = wallet;
      }
    },
    creatBudget: (state, { payload }: PayloadAction<IPlanBudgetProps>) => {
      state.budget = payload;
    },
    addTransaction: (
      state,
      action: PayloadAction<{
        walletIndex: number;
        transaction: ITransactionProps;
      }>
    ) => {
      const { walletIndex, transaction } = action.payload;
      state.wallets[walletIndex].transaction.push(transaction);
    },
    updateTransaction: (
      state,
      action: PayloadAction<{
        walletIndex: number;
        transactionIndex: number;
        transaction: ITransactionProps;
      }>
    ) => {
      const { walletIndex, transactionIndex, transaction } = action.payload;
      state.wallets[walletIndex].transaction[transactionIndex] = transaction;
    },
    removeWallet: (state, action: PayloadAction<number | string>) => {
      const walletId = action.payload;
      state.wallets = state.wallets.filter((wallet) => wallet.id !== walletId);
    },
  },
});

export const {
  setAppLoading,
  addWallet,
  updateWallet,
  updateTransaction,
  removeWallet,
  addTransaction,
  setCurrency,
  creatBudget,
} = appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
