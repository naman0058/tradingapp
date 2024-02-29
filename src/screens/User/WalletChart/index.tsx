import React from "react";
import { Modal } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Spinner,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import {
  Container,
  Content,
  LayoutCustom,
  NavigationAction,
  Text,
} from "components";
import TransactionField from "./TransactionField";
import BalanceField from "../BottomBar/Home/BalanceField";
import { appSelector } from "reduxs/reducers/app-reducer";
import { useAppSelector } from "reduxs/store";
import { waitUtil } from "utils";
import TabBar from "./TabBar";
import { RootStackParamList } from "types/navigation-types";

const WalletChart = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();

  const [loading, setLoading] = React.useState(false);
  const [visibleOption, setVisibleOption] = React.useState(false);
  const toggleOption = () => {
    setVisibleOption(!visibleOption);
  };
  const [option, setOption] = React.useState(1);
  const data = useAppSelector(appSelector).wallets;
  const [selected, setSelected] = React.useState(7);

  const findWalletById = (walletId: string | number) => {
    return data.find((wallet) => wallet.id === walletId);
  };
  const router = useRoute<RouteProp<RootStackParamList, 'WalletChart'>>().params.walletId

  const onDetailsWallet = () => {
    const _wallet=findWalletById(router)
    if (_wallet) {
      navigate("DetailsWallet", { wallet: _wallet });
    }
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={
          <LayoutCustom itemsCenter>
            <Text category="c1">Saving Wallet</Text>
            <Text category="h6">$108</Text>
          </LayoutCustom>
        }
        accessoryRight={() => (
          <LayoutCustom horizontal gap={4}>
            <NavigationAction icon="calendar" onPress={toggleOption} />
            <NavigationAction
              icon="dots-three-vertical"
              onPress={onDetailsWallet}
            />
          </LayoutCustom>
        )}
      />
      <TabBar
        tabs={DATA[option].tabs}
        selected={selected}
        onSelect={(index) => {
          setSelected(index);
          setLoading(true);
          waitUtil(1000).then(() => {
            setLoading(false);
          });
        }}
      />
      {loading ? (
        <LayoutCustom itemsCenter justify="center" mt={80}>
          <Spinner size="giant" />
        </LayoutCustom>
      ) : (
        <LayoutCustom style={{ flex: 1 }}>
          <Content contentContainerStyle={styles.content}>
            <LayoutCustom mb={8}>
              <BalanceField data={data} />
            </LayoutCustom>
            <TransactionField date={"Today, December 03"} />
            <TransactionField date={"Yesterday, December 02"} />
          </Content>
        </LayoutCustom>
      )}
      <Modal visible={visibleOption} transparent>
        <LayoutCustom justify="flex-end" style={styles.modal}>
          <LayoutCustom
            style={styles.backdrop}
            onPress={() => {
              setVisibleOption(false);
            }}
          />
          <LayoutCustom style={styles.modalContent} level="1" pt={32}>
            {DATA.map((item, index) => {
              const isActive = index === option;
              return (
                <LayoutCustom
                  key={index}
                  onPress={() => {
                    if (isActive) {
                      setVisibleOption(false);
                    } else {
                      setOption(index);
                      setVisibleOption(false);
                      setLoading(true);
                      waitUtil(1000).then(() => {
                        setLoading(false);
                      });
                      setSelected(0);
                    }
                  }}
                >
                  <Text
                    center
                    category="h4"
                    status={isActive ? "basic" : "platinum"}
                  >
                    {item.title}
                  </Text>
                </LayoutCustom>
              );
            })}
          </LayoutCustom>
        </LayoutCustom>
      </Modal>
    </Container>
  );
});

export default WalletChart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 60,
    paddingTop: 16,
  },
  modal: {
    backgroundColor: "#2A394750",
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 4,
    gap: 32,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5.84,
    elevation: 5,
  },
  buttonConfirm: {
    marginHorizontal: 16,
    marginBottom: 4,
  },
  backdrop: {
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -10,
  },
});

const DATA = [
  { title: "All Time", tabs: ["All Time (2015-2023)"] },
  {
    title: "Monthly",
    tabs: [
      "01/2023",
      "02/2023",
      "03/2023",
      "04/2023",
      "05/2023",
      "06/2023",
      "07/2023",
      "08/2023",
      "09/2023",
      "10/2023",
      "11/2023",
      "12/2023",
    ],
  },
  {
    title: "Custom",
    tabs: [
      "01/2023",
      "02/2023",
      "03/2023",
      "04/2023",
      "05/2023",
      "06/2023",
      "07/2023",
      "08/2023",
      "09/2023",
      "10/2023",
      "11/2023",
      "12/2023",
    ],
  },
  {
    title: "Yearly",
    tabs: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },
];
