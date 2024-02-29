import React from "react";
import { Image } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Components && Elements -----------------------
import { IDivider, LayoutCustom, LinearGradientText, Text } from "components";
// ----------------------------- Types ---------------------------------------
import { TransactionEnumType } from "types/redux-types";
// ----------------------------- Assets ---------------------------------------
import { IMAGE_ICON_CATEGORY } from "assets/IconCategory";
import { convertPrice } from "utils";
import _ from "lodash";
// ----------------------------- Reduxs ---------------------------------------
import { useAppSelector } from "reduxs/store";
import { appSelector } from "reduxs/reducers/app-reducer";

const LatestTransaction = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const wallets = useAppSelector(appSelector).wallets;
  const today_balance = -32.6;

  return (
    <LayoutCustom style={styles.container} level="2">
      <LayoutCustom horizontal itemsCenter justify="space-between">
        <LinearGradientText text="Today, December 03" category="h5" />
        <Text category="h5" status="warning">
          {convertPrice({ num: today_balance, maxDigits: 2 })}
        </Text>
      </LayoutCustom>
      <IDivider marginVertical={16} />
      <LayoutCustom gap={16}>
        {transaction_sample.map((trans, index) => {
          const _walletId = _.findIndex(
            wallets,
            (wallet) => wallet.id === trans.walletId
          );
          const _wallet = wallets[_walletId];
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
                    <Text category="h6">
                      {convertPrice({ num: trans.balance, maxDigits: 2 })}
                    </Text>
                  </LayoutCustom>
                  <LayoutCustom horizontal justify="space-between">
                    <Text category="c1" status="content">
                      👛 Cash wallet
                    </Text>
                    <Text category="c2" opacity={0.5}>
                      {trans.date}
                    </Text>
                  </LayoutCustom>
                </LayoutCustom>
              </LayoutCustom>
              {index < transaction_sample.length - 1 && (
                <IDivider marginLeft={44} marginTop={16} />
              )}
            </LayoutCustom>
          );
        })}
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default LatestTransaction;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  categoryImg: {
    width: 32,
    height: 32,
  },
});

const transaction_sample = [
  {
    id: 1,
    userId: "213",
    walletId: 3214,
    categoryId: 132,
    balance: 10222.32,
    date: "10/10/2022 06:27",
    type: TransactionEnumType.EXPENSESE,
    note: { textNote: "", images: undefined },
    category: {
      id: 1,
      parentId: 1,
      name: "Coffee",
      icon: "ic011",
      type: "any",
    },
  },
  {
    id: 1,
    userId: "213",
    walletId: 3214,
    categoryId: 132,
    balance: 10222.32,
    date: "10/10/2022 06:27",
    type: TransactionEnumType.EXPENSESE,
    note: { textNote: "", images: undefined },
    category: {
      id: 1,
      parentId: 1,
      name: "Food & Drink",
      icon: "ic013",
      type: "any",
    },
  },
  {
    id: 3,
    userId: "213",
    walletId: 3214,
    categoryId: 132,
    balance: 10222.32,
    date: "10/10/2022 06:27",
    type: TransactionEnumType.INCOME,
    note: { textNote: "", images: undefined },
    category: { id: 1, parentId: 1, name: "Gas", icon: "ic015", type: "any" },
  },
];
