import { ImageRequireSource, ImageSourcePropType } from 'react-native';

export enum BudgetEnumType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  WEEKLY = 'Weekly',
}

export enum TransactionEnumType {
  INCOME = 'income',
  EXPENSESE = 'expensese',
}
export enum CurrencyEnumType {
  USD = 'USD',
  ARS = 'ARS',
  GBP = 'GBP',
  JPY = 'JPY',
  INR = 'INR',
  VND = 'VND',
}

export interface INoteTransactionProps {
  textNote?: string;
  images?: ImageSourcePropType | undefined;
}
export interface SimpleCategoryProps {
  id: number | string;
  parentId: number | string;
  name: string;
  icon: string;
}

export interface ICategoryProps extends SimpleCategoryProps {
  children?: SimpleCategoryProps[] | undefined;
}

export interface ITransactionProps {
  id: number | string;
  userId: number | string;
  walletId: number | string;
  categoryId: number | string;
  balance: number;
  date: string | Date;
  type: TransactionEnumType;
  note?: INoteTransactionProps | undefined;
  category: ICategoryProps;
}
export interface IWalletProps {
  id: number | string;
  symbol: string;
  title: string;
  image?: ImageRequireSource | undefined | null;
  balance: number;
  transaction?: ITransactionProps[] | undefined;
}

export interface IBudgetProps {
  id: string | number;
  parentId: string | number;
  image: ImageSourcePropType;
  title: string;
  amount: number;
  balance: number;
  create_at: Date;
}
export interface IPlanBudgetProps {
  id: string | number;
  type: BudgetEnumType;
  transactions: ITransactionProps[];
  budgets: IBudgetProps[];
  create_at: Date;
}

export interface IAppState {
  appLoading: boolean;
  wallets: Array<IWalletProps>;
  currency: CurrencyEnumType;
  budget?: IPlanBudgetProps | undefined;
}
