import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import _ from "lodash";
import {
  Container,
  Content,
  LayoutCustom,
  LinearGradientText,
  Text,
} from "components";
import EmptyWallet from "./EmptyWallet";
import { RootStackParamList } from "types/navigation-types";
import { useAppSelector } from "reduxs/store";
import { appSelector } from "reduxs/reducers/app-reducer";
import WalletSelect from "./WalletSelect";
import BalanceField from "./BalanceField";
import UpcomingBill from "./UpcomingBill";
import LatestTransaction from "./LatestTransaction";
import { useLayout } from "hooks";
import SelectDate from "./SelectDate";
import { IWalletProps } from "types/redux-types";
import { Modalize, useModalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import WalletSelectItem from "./WalletSelectItem";

const HomeScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height } = useLayout();

  const _onListBill=()=>{
    navigate('RecurringBilling')
  }
  const _onNewWallet = () => {
    navigate("NewWallet");
  };
  const { ref: modalizeRef, open, close } = useModalize();

  const data = useAppSelector(appSelector).wallets;
  const sumBalance = _.sumBy(data, (i) => i.balance);
  React.useEffect(() => {
    setWallet({
      title: "All Wallet",
      balance: sumBalance,
      id: "AllWallet",
    });
  }, [sumBalance]);

  const [selectedWallet, setWallet] = React.useState<IWalletProps>({
    title: "All Wallet",
    balance: sumBalance,
    id: "AllWallet",
  });

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom horizontal justify="space-between" mh={16}>
          {selectedWallet && (
            <WalletSelect
              wallet={selectedWallet}
              onOpen={open}
              onClose={close}
            />
          )}
          <SelectDate />
        </LayoutCustom>
        <>
          {_.isEmpty(data) ? (
            <LayoutCustom justify="space-between">
              <EmptyWallet />
              <LayoutCustom style={styles.cardNewWallet} onPress={_onNewWallet}>
                <Icon pack="assets" name={"wallet"} style={styles.wallet} />
                <Text category="h4">Create new wallet</Text>
              </LayoutCustom>
            </LayoutCustom>
          ) : (
            <LayoutCustom mh={16} gap={24}>
              <BalanceField data={data} />
              <LayoutCustom gap={16}>
                <LayoutCustom
                  onPress={_onListBill}
                  horizontal
                  itemsCenter
                  justify="flex-start"
                  gap={4}
                >
                  <LinearGradientText text={"Upcoming Bill"} category="h3" />
                  <Icon
                    pack="assets"
                    name={"caret-right"}
                    style={styles.caret}
                  />
                </LayoutCustom>
                <>
                  {upcoming_bill.map((bill, index) => {
                    return <UpcomingBill data={bill} key={index} />;
                  })}
                </>
              </LayoutCustom>
              <LinearGradientText text={"Latest transaction"} category="h3" />
              <LatestTransaction />
            </LayoutCustom>
          )}
        </>
      </Content>
      <Portal>
        <Modalize
          ref={modalizeRef}
          withHandle
          handlePosition="outside"
          snapPoint={(data.length + 2) * 100}
          modalStyle={styles.modalStyle}
        >
          <LayoutCustom style={styles.contentContainer}>
            <Text category="h4" marginBottom={24}>
              Select Wallet
            </Text>
            <WalletSelectItem
              item={{
                title: "All Wallet",
                balance: sumBalance,
                id: "AllWallet",
              }}
              onPress={() => {
                close();
                setWallet({
                  title: "All Wallet",
                  balance: sumBalance,
                  id: "AllWallet",
                });
              }}
            />
            {data &&
              data.map((item, index) => {
                return (
                  <WalletSelectItem
                    key={index}
                    item={item}
                    onPress={() => {
                      close();
                      setWallet(item);
                    }}
                  />
                );
              })}
          </LayoutCustom>
        </Modalize>
      </Portal>
    </Container>
  );
});

export default HomeScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  wallet: {
    width: 28,
    height: 28,
    tintColor: "text-white-color",
  },
  cardNewWallet: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "color-primary-default",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    gap: 9,
    marginTop: 80,
  },
  content: {
    gap: 16,
    paddingBottom: 80,
  },
  title: {},
  caret: {
    width: 24,
    height: 24,
    tintColor: "text-basic-color",
  },
  modalStyle: {
    backgroundColor: "background-basic-color-1",
    padding: 24,
  },
  contentContainer: {
    width: "100%",
    paddingBottom: 40,
  },
});
const upcoming_bill = [
  {
    image: Images.netflix,
    title: "NETFLIX Premium",
    description: "exp 25-05-2024",
    price: 4.99,
  },
];
