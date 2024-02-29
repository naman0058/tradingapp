import React from 'react';
import { Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, LinearGradientText, IDivider, Text } from 'components';
import { convertPrice } from 'utils';
import { IMAGE_ICON_CATEGORY } from 'assets/IconCategory';
import { sample_data } from './data';
import _ from 'lodash';
import { IWalletProps, TransactionEnumType } from 'types/redux-types';

const TransactionField = React.memo(({ date }: { date: string }) => {
  const styles = useStyleSheet(themedStyles);
  const sumByTransactionType = (
    data: IWalletProps,
    transactionType: TransactionEnumType,
  ): number => {
    return data.transaction.reduce((sum, transaction) => {
      if (transaction.type === transactionType) {
        return sum + transaction.balance;
      }
      return sum;
    }, 0);
  };

  const totalExpenses = sumByTransactionType(sample_data, TransactionEnumType.EXPENSESE);
  const totalIncome = sumByTransactionType(sample_data, TransactionEnumType.INCOME);

  //   console.log('Total Expenses:', totalExpenses);
  //   console.log('Total Income:', totalIncome);
  const _sum = totalIncome - totalExpenses;

  return (
    <LayoutCustom style={styles.container} level="2">
      <LayoutCustom horizontal itemsCenter justify="space-between">
        <LinearGradientText text={date} category="h5" />
        <Text category="h5" status="warning">
          {convertPrice({ num: _sum, maxDigits: 2 })}
        </Text>
      </LayoutCustom>
      <IDivider marginVertical={16} />
      <LayoutCustom gap={16}>
        {sample_data.transaction.map((trans, index) => {
          return (
            <LayoutCustom key={index}>
              <LayoutCustom key={index} gap={12} horizontal>
                <Image
                  source={IMAGE_ICON_CATEGORY[trans.category.icon]}
                  //@ts-ignore
                  style={styles.categoryImg}
                />
                <LayoutCustom style={{ flex: 1 }} gap={8}>
                  <LayoutCustom horizontal justify="space-between">
                    <Text category="subhead">{trans.category.name}</Text>
                    <Text category="h6">{convertPrice({ num: trans.balance, maxDigits: 2 })}</Text>
                  </LayoutCustom>
                  <LayoutCustom horizontal justify="space-between">
                    {sample_data && (
                      <Text category="c1" status="content">
                        {sample_data.title}
                      </Text>
                    )}
                    <Text category="c2" opacity={0.5}>
                      {trans.date}
                    </Text>
                  </LayoutCustom>
                </LayoutCustom>
              </LayoutCustom>
              {index < sample_data.transaction.length - 1 && (
                <IDivider marginLeft={44} marginTop={16} />
              )}
            </LayoutCustom>
          );
        })}
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default TransactionField;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  content: {},
});
