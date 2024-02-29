import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Button,
  Icon,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import _ from "lodash";
import { Container, Content, LayoutCustom, Text } from "components";
import CustomButton from "./CustomButton";
// ----------------------------- Reduxs ---------------------------------------
import { appSelector } from "reduxs/reducers/app-reducer";
import { useAppSelector } from "reduxs/store";
// ----------------------------- Utils ---------------------------------------
import { convertPrice } from "utils";
// ----------------------------- Types ---------------------------------------
import { RootStackParamList } from "types/navigation-types";

const ProfileScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const data = useAppSelector(appSelector).wallets;
  const currency = useAppSelector(appSelector).currency;
  const sumBalance = _.sumBy(data, (i) => i.balance);

  const onUpgradePremium = () => {
    navigate("GetPremium");
  };
  const onNotification = () => {};
  const onCurrency = () => {
    navigate("CurrencyScreen");
  };
  const onWallet = () => {
    navigate("BottomBar", { screen: "Wallet" });
  };
  const onSetBill = () => {};

  return (
    <Container style={styles.container}>
      <TopNavigation />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom itemsCenter gap={8}>
          <Avatar source={Images.avatar_01} size="giant" />
          <Text category="h3" marginTop={8}>
            Albert Flores
          </Text>
          <Text category="body" status="content">
            Flores@company.com
          </Text>
          <Button
            children={"Premium Account"}
            onPress={onUpgradePremium}
            accessoryLeft={<Icon pack="assets" name="crown" />}
          />
        </LayoutCustom>
        <LayoutCustom gap={4}>
          <CustomButton
            icon="bell"
            title="Notifications"
            describe="Open all"
            onPress={() => {}}
          />
          <CustomButton
            icon="gear-six"
            title="Currency"
            describe={currency}
            onPress={onCurrency}
          />
          <CustomButton
            icon="suitcase"
            title="Wallet"
            describe={`Total: ${convertPrice({
              num: sumBalance,
              maxDigits: 2,
            })}`}
            onPress={onWallet}
          />
          <CustomButton
            icon="suitcase"
            title="Set Bill"
            describe="4 Bills"
            onPress={() => {navigate('RecurringBilling')}}
          />
          <Text category="h6" style={styles.helpCenter}>
            Help Center
          </Text>
          <LayoutCustom mt={12} itemsCenter justify="space-between" horizontal>
            <Text category="h6" style={styles.helpCenter}>
              Logout
            </Text>
            <Text category="subhead" style={styles.helpCenter}>
              v.05.2023
            </Text>
          </LayoutCustom>
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default ProfileScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    gap: 32,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  helpCenter: {
    color: "color-basic-700",
  },
});
