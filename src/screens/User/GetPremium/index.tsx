import React from "react";
import { Image, Modal } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
} from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import {
  Container,
  Content,
  LayoutCustom,
  LinearGradientText,
  NavigationAction,
  Text,
} from "components";
import OptionButton from "./OptionButton";
import SuccessPay from "./SuccessPay";

const GetPremium = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { height, width,bottom } = useLayout();

  const [visible, setVisible] = React.useState(false);
  const closeModal = () => {
    setVisible(false);
  };

  const size = { width: width, height: 210 * (height / 812) };
  const options = [
    {
      title: "Backup & sync",
      describe: "Send monthly statement to your email",
      icon: "cloud",
    },
    {
      title: "Remove ads",
      describe: "Remove all ads on the application",
      icon: "no_ads",
    },
    {
      title: "Unlimited wallets",
      describe: "Unlimited wallet creation manage",
      icon: "wallet_open",
    },
  ];
  const _onUpgrade = () => {
    setVisible(true);
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={"Get Premium"}
        alignment="center"
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom itemsCenter>
          <Image source={Images.cash_wallet} style={size} />
          <LinearGradientText text={"$1.99/year"} category="h3" />
        </LayoutCustom>
        <LayoutCustom style={styles.contentPremium} mt={32}>
          <Text category="h3" marginBottom={12}>
            Premium Account
          </Text>
          <Text status="note" marginBottom={24}>
            Upgrade your premium account to unlock all the special functions of
            the app.
          </Text>
          <LayoutCustom gap={24}>
            {options.map((item, index) => {
              return <OptionButton data={item} key={index} />;
            })}
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom style={styles.bottomContent} />
      </Content>
      <LayoutCustom level="2" ph={16} pv={4} pb={bottom+4}>
        <Button children={"Upgrage"} onPress={_onUpgrade} />
      </LayoutCustom>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <Container>
        <SuccessPay onClose={closeModal} />
        </Container>
      </Modal>
    </Container>
  );
});

export default GetPremium;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  contentPremium: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "background-basic-color-2",
  },
  bottomContent: {
    height: "40%",
    width: "100%",
    position: "absolute",
    backgroundColor: "background-basic-color-2",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -100,
  },
  modal: {
    width: "100%",
    height: "100%",
  },
});
