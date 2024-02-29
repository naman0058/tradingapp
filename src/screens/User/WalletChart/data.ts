import { ITransactionProps, IWalletProps, TransactionEnumType } from 'types/redux-types';

export const sample_data: IWalletProps = {
  id: '1',
  balance: 9988.68,
  title: 'Cash wallet',
  symbol: '👛',
  transaction: [
    {
      id: 1,
      userId: '213',
      walletId: 3214,
      categoryId: 132,
      balance: 10101.32,
      date: '10/10/2022 06:27',
      type: TransactionEnumType.EXPENSESE,
      note: { textNote: '', images: undefined },
      category: { id: 1, parentId: 1, name: 'Coffee', icon: 'ic011' },
    },
    {
      id: 1,
      userId: '213',
      walletId: 3214,
      categoryId: 132,
      balance: 40122.32,
      date: '10/10/2022 06:27',
      type: TransactionEnumType.EXPENSESE,
      note: { textNote: '', images: undefined },
      category: { id: 1, parentId: 1, name: 'Food & Drink', icon: 'ic013' },
    },
    {
      id: 3,
      userId: '213',
      walletId: 3214,
      categoryId: 132,
      balance: 30212.32,
      date: '10/10/2022 06:27',
      type: TransactionEnumType.INCOME,
      note: { textNote: '', images: undefined },
      category: { id: 1, parentId: 1, name: 'Gas', icon: 'ic015' },
    },
  ],
};
