import React from "react";
import { Image, Modal } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Button,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Components && Elements -----------------------
import { Container, Content, LayoutCustom, Text } from "components";
import {
  ITransactionProps,
  IWalletProps,
  TransactionEnumType,
} from "types/redux-types";
import { LinearGradient } from "expo-linear-gradient";
import { isArray } from "lodash";
import _ from "lodash";
import { IMAGE_ICON_CATEGORY } from "assets/IconCategory";
import { convertPrice, waitUtil } from "utils";
import { RootStackParamList } from "types/navigation-types";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { removeWallet } from "reduxs/reducers/app-reducer";
import { useAppDispatch } from "reduxs/store";
import { Images } from "assets/images";

interface WalletItemProps {
  wallet: IWalletProps;
  backgroundColor: string[] | string;
  isFirst: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({
  isFirst,
  wallet,
  backgroundColor,
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const size = { height: 127, width: width - 32 };
  const sizeModal = { width: 160 * (width / 375), height: 160 * (width / 375) };

  const swipeableRef = React.useRef<Swipeable>(null);
  const [visible, setVisible] = React.useState(false);

  const sumTransactionsByType = (
    transaction: ITransactionProps[],
    type: TransactionEnumType
  ): number => {
    return transaction.reduce((total, wallet) => {
      const transactionsOfType = transaction.filter(
        (transaction) => transaction.type === type
      );
      const sumOfType = transactionsOfType.reduce(
        (subtotal, transaction) => subtotal + transaction.balance,
        0
      );
      return total + sumOfType;
    }, 0);
  };
  //   const sumBalance = _.sumBy(data, (i) => i.balance);

  const totalIncome = sumTransactionsByType(
    wallet.transaction,
    TransactionEnumType.INCOME
  );
  const totalExpenses = sumTransactionsByType(
    wallet.transaction,
    TransactionEnumType.EXPENSESE
  );
  const _sumBalance = wallet.balance + totalIncome - totalExpenses;
  const size_icon = { width: 24, height: 24 };

  const dispath = useAppDispatch();
  const handleRemove = (index: number | string) => {
    dispath(removeWallet(index));
  };
  const _onYes = () => {
    swipeableRef.current?.close();
    handleRemove(wallet.id);
    waitUtil(750).then(() => {
      setVisible(false);
    });
  };
  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <LayoutCustom minWidth={width}>
            <Text> </Text>
          </LayoutCustom>
        )}
        renderRightActions={() => (
          <LayoutCustom minWidth={width}>
            <Text> </Text>
          </LayoutCustom>
        )}
        containerStyle={{ paddingHorizontal: 16 }}
        onSwipeableOpen={() => {
          // setCurrentWallet(wallet);
          setVisible(true);
        }}
      >
        <RectButton
          onPress={() => {
            wallet.id && navigate("WalletChart", { walletId: wallet.id });
          }}
        >
          <LayoutCustom style={[styles.container, size]} onLongPress={() => {}}>
            {isArray(backgroundColor) && (
              <LinearGradient
                colors={backgroundColor}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.3, y: 0 }}
                style={[styles.linear, size]}
              />
            )}
            <LayoutCustom
              horizontal
              itemsCenter
              pv={4}
              mb={16}
              justify="space-between"
            >
              <Text status={isFirst ? "black" : "basic"}>{wallet.title}</Text>
              {wallet.transaction.length > 0 ? (
                <Image
                  source={
                    IMAGE_ICON_CATEGORY[wallet.transaction[0].category.icon]
                  }
                  style={size_icon}
                />
              ) : (
                <></>
              )}
            </LayoutCustom>
            <LayoutCustom>
              <Text category="h2" status={isFirst ? "black" : "basic"}>
                {convertPrice({ num: _sumBalance, maxDigits: 2 })}
              </Text>
            </LayoutCustom>
          </LayoutCustom>
        </RectButton>
      </Swipeable>
      <Modal visible={visible}>
        <Container>
          <Content contentContainerStyle={styles.contentModal}>
            <Image source={Images.wallet_delete} style={sizeModal} />
            <Text category="h3" marginHorizontal={32} center>
              Do you want remove this wallet ?
            </Text>
            <Text category="body" center>
              You will loss all date input before. Really agree with it?
            </Text>
          </Content>
          <LayoutCustom ph={16} gap={8} horizontal itemsCenter pv={6}>
            <Button
              children={"Yes"}
              style={[styles.button, { backgroundColor: "#3E517A" }]}
              onPress={_onYes}
            />
            <Button
              children={"No"}
              style={styles.button}
              onPress={() => {
                setVisible(false);
                swipeableRef.current?.close();
              }}
            />
          </LayoutCustom>
        </Container>
      </Modal>
    </>
  );
};

export default WalletItem;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
  },
  content: {},
  linear: {
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -100,
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  contentModal: {
    gap: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  button: {
    flex: 1,
  },
});
