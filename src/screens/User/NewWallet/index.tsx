import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Input,
  ViewPager,
  Button,
  Icon,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Components && Elements -----------------------
import {
  Container,
  Content,
  LayoutCustom,
  LinearGradientText,
  NavigationAction,
  Text,
} from "components";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "reduxs/store";
import TagCurrency from "components/TagCurrency";
import * as Yup from "yup";
import { formatNumber, waitUtil } from "utils";
import { RootStackParamList } from "types/navigation-types";
import { addWallet, appSelector } from "reduxs/reducers/app-reducer";

type FormikForm = {
  title: string;
  symbol: string;
  balance: string;
};

const NewWallet = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const initValues: FormikForm = {
    title: "",
    balance: "1234.00",
    symbol: "👛️",
  };

  const dispatch = useAppDispatch();

  const refBalance = React.useRef<Input>(null);
  const refName = React.useRef<Input>(null);
  const currency = useAppSelector(appSelector).currency;

  const _goBack = () => {
    switch (activeIndex) {
      case 1:
        setActiveIndex(activeIndex - 1);
        refBalance.current?.blur();
        waitUtil(350).then(()=>{
          refName.current?.focus();
        })
      case 2:
        setActiveIndex(activeIndex - 1);
      case 3:
        setActiveIndex(activeIndex - 1);
        refBalance.current?.focus();
      default:
        return console.log(activeIndex);
    }
  };
  const validationWallet = Yup.object().shape({
    title: Yup.string()
      .required("Wallet name required")
      .min(3, "Invalid title. Wallet name must more than 3 characters"),
    balance: Yup.number()
      .required("Balance is required")
      .min(0.1, "Balance must more than 0"),
    symbol: Yup.string().required("Select one type"),
  });
  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    return random;
  };
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationWallet}
      onSubmit={(values) => {
        dispatch(
          addWallet({
            id: generateRandomNumber(),
            title: values.title,
            balance: Number(values.balance),
            transaction: [],
            image: undefined,
            symbol: values.symbol,
          })
        );
        waitUtil(750).then(() => {
          navigate("BottomBar", { screen: "Home" });
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
      }) => {
        return (
          <Container style={styles.container}>
            <TopNavigation
              alignment="center"
              title="Create Wallet"
              style={styles.topNavigation}
              accessoryLeft={() => <NavigationAction onPress={_goBack} />}
            />
            <Content contentContainerStyle={styles.content}>
              <ViewPager
                style={styles.viewpager}
                selectedIndex={activeIndex}
                onSelect={setActiveIndex}
              >
                {/* Page 1 */}
                <LayoutCustom style={styles.page}>
                  <Input
                    ref={refName}
                    accessoryLeft={() => (
                      <Text category="h3">{values.symbol}</Text>
                    )}
                    placeholder="Enter your wallet name"
                    style={styles.input}
                    value={`${values.title}`}
                    keyboardType='email-address'
                    onBlur={handleBlur("title")}
                    autoFocus={false}
                    onChangeText={handleChange("title")}
                  />
                  {errors.title && (
                    <Text
                      status="warning"
                      category="c1"
                      marginLeft={4}
                      marginTop={4}
                    >
                      {errors.title}
                    </Text>
                  )}

                  <LayoutCustom
                    wrap
                    horizontal
                    rowGap={12}
                    columnGap={8}
                    mt={16}
                  >
                    {SAMPLE_NAME.map((item, index) => {
                      const active = item.symbol === values.symbol;
                      return (
                        <LayoutCustom
                          key={index}
                          style={[
                            styles.tag,
                            active && {
                              backgroundColor: theme["text-primary-color"],
                            },
                          ]}
                          onPress={() => {
                            handleChange("symbol")(item.symbol);
                            handleChange("title")(item.title);
                          }}
                        >
                          <LayoutCustom horizontal itemsCenter gap={6}>
                            <Text category="subhead">{item.symbol}</Text>
                            <Text>{item.title}</Text>
                          </LayoutCustom>
                        </LayoutCustom>
                      );
                    })}
                  </LayoutCustom>
                  {errors.symbol && (
                    <Text
                      status="warning"
                      category="c1"
                      marginLeft={4}
                      marginTop={4}
                    >
                      {errors.symbol}
                    </Text>
                  )}
                </LayoutCustom>
                {/* Page 2 */}
                <LayoutCustom style={styles.page} mt={56}>
                  <LayoutCustom horizontal justify="center">
                    <LayoutCustom
                      gap={5}
                      itemsCenter
                      onPress={() => {
                        refBalance.current?.focus();
                      }}
                    >
                      <LinearGradientText text={values.balance} category="h0" />
                      <Text status="platinum" center>
                        Initial balance
                      </Text>
                    </LayoutCustom>
                    <LayoutCustom style={styles.tagCurrency}>
                      <TagCurrency />
                    </LayoutCustom>
                  </LayoutCustom>
                  {errors.balance && (
                    <Text center status="warning" category="c1" marginTop={8}>
                      {errors.balance}
                    </Text>
                  )}
                  <Input
                    ref={refBalance}
                    style={{ opacity: 0, position: "absolute" }}
                    keyboardType="numeric"
                    onBlur={handleBlur("balance")}
                    onChangeText={(text) => {
                      const sanitizedValue = text.replace(/,/g, "");
                      if (!isNaN(parseInt(text))) {
                        setFieldValue("balance", sanitizedValue);
                      } else {
                        setFieldValue("balance", "0.00");
                      }
                    }}
                  />
                </LayoutCustom>
                {/* Page 3 */}
                <LayoutCustom style={styles.page3} level="2">
                  <LayoutCustom
                    horizontal
                    itemsCenter
                    justify="space-between"
                    padding={16}
                  >
                    <LayoutCustom horizontal itemsCenter gap={16}>
                      <Text category="h3">{values.symbol}</Text>
                      <Text category="body">
                        {values.title.replace(values.symbol, "")}
                      </Text>
                    </LayoutCustom>
                    <Icon pack="assets" name="caret-right" />
                  </LayoutCustom>
                  <LayoutCustom
                    horizontal
                    itemsCenter
                    justify="space-between"
                    padding={16}
                  >
                    <LayoutCustom horizontal itemsCenter gap={16}>
                      <Icon
                        pack="assets"
                        name="money"
                        style={styles.iconMoney}
                      />
                      <Text category="body">
                        {formatNumber({ num: Number(values.balance) })}{" "}
                        {currency}
                      </Text>
                    </LayoutCustom>
                    <Icon pack="assets" name="caret-right" />
                  </LayoutCustom>
                </LayoutCustom>
              </ViewPager>
            </Content>
            <Button
              children={activeIndex === 2 ? "Create a New Wallet" : "Next"}
              onPress={() => {
                if (
                  activeIndex === 0 &&
                  values.title.length > 3 &&
                  !errors.title
                ) {
                  setActiveIndex(1);
                  refBalance.current?.focus();
                } else {
                }
                if (
                  activeIndex === 1 &&
                  parseInt(values.balance) > 0 &&
                  !errors.balance
                ) {
                  setActiveIndex(2);
                }
                if (activeIndex === 2) {
                  handleSubmit();
                }
              }}
              style={styles.buttonNext}
            />
          </Container>
        );
      }}
    </Formik>
  );
});

export default NewWallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingHorizontal: 8,
  },
  content: {},
  viewpager: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  page3: {
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "background-basic-color-2",
  },
  buttonNext: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  linearText: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: "SpaceGrotesk-Bold",
    textAlign: "center",
  },
  tagCurrency: {
    top: 0,
    position: "absolute",
    right: 0,
  },
  iconMoney: {
    width: 28,
    height: 28,
    tintColor: "text-basic-color",
  },
});

const SAMPLE_NAME = [
  { symbol: "💵️", title: "Cash" },
  { symbol: "👛️", title: "E-Wallet" },
  { symbol: "🏦️", title: "Bank" },
  { symbol: "🪙️", title: "Crypto" },
  { symbol: "💳️", title: "Card" },
];
