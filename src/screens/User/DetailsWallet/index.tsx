import React from "react";
import { Image, Modal } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
  Icon,
  Input,
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
  LoadingScreen,
  NavigationAction,
  Text,
} from "components";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "types/navigation-types";
import { convertPrice, waitUtil } from "utils";
import { useAppDispatch } from "reduxs/store";
import { removeWallet, updateWallet } from "reduxs/reducers/app-reducer";
import { Formik } from "formik";
import * as Yup from "yup";
import ModalUpdateName from "./ModalUpdateName";
import ModalBalance from "./ModalBalance";

const DetailsWallet = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { height, width, bottom } = useLayout();
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [visibleName, setVisibleName] = React.useState(false);
  const [visibleBalance, setVisibleBalance] = React.useState(false);

  const dispatch = useAppDispatch();
  const sizeModal = { width: 160 * (width / 375), height: 160 * (width / 375) };

  const route = useRoute<RouteProp<RootStackParamList, "DetailsWallet">>();
  const wallet = route.params.wallet;

  const handleRemove = () => {
    dispatch(removeWallet(wallet.id));
  };

  const _onDelete = () => {
    setVisible(true);
  };
  const _onUpdate = () => {};
  const initValues = wallet;
  const validationWallet = Yup.object().shape({
    title: Yup.string()
      .required("Wallet name required")
      .min(3, "Invalid title. Wallet name must more than 3 characters"),
    balance: Yup.number()
      .required("Balance is required")
      .min(0.1, "Balance must more than 0"),
    symbol: Yup.string().required("Select one type"),
  });

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationWallet}
      onSubmit={(values) => {
        dispatch(
          updateWallet({
            wallet: {
              id: values.id,
              title: values.title,
              balance: Number(values.balance),
              transaction: [],
              image: undefined,
              symbol: values.symbol,
            },
          })
        );
        waitUtil(750).then(() => {
          navigate("BottomBar", { screen: "Home" });
        });
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => {
        return (
          <Container style={styles.container}>
            <TopNavigation accessoryLeft={() => <NavigationAction />} />
            <Content contentContainerStyle={styles.content}>
              {!wallet ? (
                <>
                  <LoadingScreen />
                </>
              ) : (
                <LayoutCustom style={styles.layout} level="2">
                  <LayoutCustom
                    horizontal
                    justify="space-between"
                    padding={16}
                    itemsCenter
                  >
                    <LayoutCustom
                      horizontal
                      itemsCenter
                      gap={16}
                      onPress={() => {
                        setVisibleName(true);
                      }}
                    >
                      <Text category="h3">{values.symbol}</Text>
                      <Text category="body">{values.title}</Text>
                    </LayoutCustom>
                    <Icon
                      style={styles.arrow}
                      name="caret-right"
                      pack="assets"
                    />
                  </LayoutCustom>
                  <LayoutCustom
                    horizontal
                    justify="space-between"
                    padding={16}
                    itemsCenter
                    onPress={() => {
                      setVisibleBalance(true);
                    }}
                  >
                    <LayoutCustom horizontal itemsCenter gap={16}>
                      <Icon pack="assets" name="money" style={styles.money} />
                      <Text category="body">
                        {convertPrice({ num: values.balance })}
                      </Text>
                    </LayoutCustom>
                    <Icon
                      style={styles.arrow}
                      name="caret-right"
                      pack="assets"
                    />
                  </LayoutCustom>
                </LayoutCustom>
              )}
            </Content>
            <LayoutCustom ph={16} gap={8} horizontal itemsCenter pv={6}>
              <Button
                children={"Delete"}
                style={[styles.button, { backgroundColor: "#3E517A" }]}
                onPress={_onDelete}
              />
              <Button
                children={"Update"}
                style={styles.button}
                onPress={() => handleSubmit()}
              />
            </LayoutCustom>
            <Modal visible={visible} animationType="slide">
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
                    onPress={handleRemove}
                  />
                  <Button
                    children={"No"}
                    style={styles.button}
                    onPress={() => {
                      setVisible(false);
                    }}
                  />
                </LayoutCustom>
              </Container>
            </Modal>
            <Modal visible={visibleName} animationType="slide">
              <ModalUpdateName
                onClose={() => {
                  setVisibleName(false);
                }}
                name={values.title}
                handleChangeName={(t: string) => setFieldValue("title", t)}
                handleChangeSymbol={(t: string) => setFieldValue("symbol", t)}
                symbol={values.symbol}
              />
            </Modal>
            <Modal visible={visibleBalance} animationType="slide">
              <ModalBalance
                onClose={() => {
                  setVisibleBalance(false);
                }}
                balance={values.balance}
                handleChangeBalance={(t: string) => setFieldValue("balance", t)}
              />
            </Modal>
          </Container>
        );
      }}
    </Formik>
  );
});

export default DetailsWallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  layout: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  arrow: {
    tintColor: "text-placeholder-color",
    width: 20,
    height: 20,
  },
  money: {
    width: 28,
    height: 28,
    tintColor: "text-basic-color",
  },
  button: {
    flex: 1,
  },
  contentModal: {
    gap: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
});
