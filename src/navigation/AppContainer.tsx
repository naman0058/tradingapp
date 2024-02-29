import React from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";
import { RootStackParamList } from "types/navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./root-navigation";
import { Host } from "react-native-portalize";

// --------------------------- Screens -------------------------------------
import SplashScreen from "screens/Splash";
import BottomBarNavigator from "./BottomBarNavigator";
import NewWallet from "screens/User/NewWallet";
import NewTransaction from "screens/User/NewTransaction";
import CurrencyScreen from "screens/User/Currency/CurrencyScreen";
import RemoveProfileWallet from "screens/User/RemoveProfileWallet";
import GetPremium from "screens/User/GetPremium";
import NewBudget from "screens/User/NewBudget";
import SuccessBudget from "screens/User/NewBudget/SuccessBudget";
import WalletChart from "screens/User/WalletChart";
import ChartIncome from "screens/User/ChartIncome";
import ChartExpenses from "screens/User/ChartExpenses";
import CategoryTransaction from "screens/User/CategoryTransaction";
import DetailsWallet from "screens/User/DetailsWallet";
import RecurringBilling from "screens/User/RecurringBilling";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppContainer = () => {
  const themes = useTheme();
  return (
    <Host>
      <NavigationContainer ref={navigationRef}>
        <View
          style={{
            backgroundColor: themes["background-basic-color-1"],
            flex: 1,
          }}
        >
          <Stack.Navigator
            initialRouteName={"SplashScreen"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="BottomBar" component={BottomBarNavigator} />
            <Stack.Screen name="NewWallet" component={NewWallet} />
            <Stack.Screen name="NewTransaction" component={NewTransaction} />
            <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} />
            <Stack.Screen
              name="RemoveProfileWallet"
              component={RemoveProfileWallet}
            />
            <Stack.Screen name="GetPremium" component={GetPremium} />
            <Stack.Screen name="NewBudget" component={NewBudget} />
            <Stack.Screen name="SuccessBudget" component={SuccessBudget} />
            <Stack.Screen name="WalletChart" component={WalletChart} />
            <Stack.Screen name="ChartIncome" component={ChartIncome} />
            <Stack.Screen name="ChartExpenses" component={ChartExpenses} />
            <Stack.Screen
              name="CategoryTransaction"
              component={CategoryTransaction}
            />
            <Stack.Screen
              name="DetailsWallet"
              component={DetailsWallet}
            />
            <Stack.Screen
              name="RecurringBilling"
              component={RecurringBilling}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Host>
  );
};

export default AppContainer;
