import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Icon,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useLayout, useModalize } from "hooks";
// ----------------------------- Components && Elements -----------------------
import _ from "lodash";
import WalletSelectItem from "./WalletSelectItem";
import { Modalize } from "react-native-modalize";
import {
  LayoutCustom,
  LinearGradientText,
  LoadingScreen,
  Text,
} from "components";
// ----------------------------- Reduxs ---------------------------------------
import { appSelector } from "reduxs/reducers/app-reducer";
import { useAppSelector } from "reduxs/store";
// ----------------------------- Utils ---------------------------------------
import { convertPrice, waitUtil } from "utils";
import { Platform } from "react-native";
import { IWalletProps } from "types/redux-types";
import { Portal } from "react-native-portalize";

interface WalletSelectProps {
  wallet: IWalletProps;
  onOpen(): void;
  onClose(): void;
}

const WalletSelect = ({ wallet, onClose, onOpen }: WalletSelectProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      <LayoutCustom gap={4} onPress={onOpen}>
        <LayoutCustom itemsCenter horizontal gap={8}>
          <LinearGradientText text={wallet.title} category="h5" />
          <Icon pack="assets" name={"caret-down"} style={styles.caret} />
        </LayoutCustom>
        <Text category="h3">
          {convertPrice({ num: wallet.balance, maxDigits: 2 })}
        </Text>
      </LayoutCustom>
    </>
  );
};

export default WalletSelect;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  caret: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
  },
  selectDate: {
    backgroundColor: "background-basic-color-2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 99,
    gap: 8,
  },
  caretDown: {
    width: 16,
    height: 16,
    tintColor: "text-basic-color",
  },
  contentContainer: {
    width: "100%",
    paddingBottom: 40,
  },
  modalStyle: {
    backgroundColor: "background-basic-color-1",
    padding: 24,
  },
});
const sample_option = ["May 2023", "April 2023", "March 2023", "All time"];
