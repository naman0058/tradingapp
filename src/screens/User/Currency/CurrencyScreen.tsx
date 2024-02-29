import React from 'react';

// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, Input, StyleService, Icon, useStyleSheet, useTheme } from '@ui-kitten/components';

// ----------------------------- Components && Elements -----------------------
import { Container, Content, LayoutCustom, NavigationAction, Text } from 'components';

// ----------------------------- Reduxs ---------------------------------------
import { useAppDispatch, useAppSelector } from 'reduxs/store';
import { appSelector, setCurrency } from 'reduxs/reducers/app-reducer';

// ----------------------------- Types -----------------------------------
import { CurrencyEnumType } from 'types/redux-types';
import { useNavigation } from '@react-navigation/native';

const CurrencyScreen = React.memo(() => {
  const theme = useTheme();
  const {goBack}=useNavigation()
  const styles = useStyleSheet(themedStyles);

  const currency = useAppSelector(appSelector).currency;
  const dispatch = useAppDispatch();
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Currency"
        accessoryLeft={() => <NavigationAction />}
      />
      <Content contentContainerStyle={styles.content}>
        <Input
          style={styles.input}
          placeholder="Search currency"
          accessoryLeft={<Icon pack="assets" name="search" />}
        />
        <LayoutCustom gap={24} mh={8}>
          {data.map((item, index) => {
            const isActive = currency === item.currency;
            return (
              <LayoutCustom key={index} horizontal justify="space-between" onPress={()=>{
                dispatch(setCurrency(item.currency))
                goBack()
              }}>
                <LayoutCustom>
                  <Text category="h4" status={isActive ? 'primary' : 'basic'}>
                    {item.title}
                  </Text>
                  <Text category="c1" style={{ color: theme['color-basic-1000'] }}>
                    {item.describe}
                  </Text>
                </LayoutCustom>
                <Text category="h4" status={isActive ? 'primary' : 'basic'}>
                  {item.currency}
                </Text>
              </LayoutCustom>
            );
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default CurrencyScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 24,
    paddingHorizontal: 16,
  },
  input: {},
});

const data = [
  { title: 'Argentina', describe: 'Peso Argentina', currency: CurrencyEnumType.ARS },
  { title: 'Kingdom of England', describe: 'British Pound', currency: CurrencyEnumType.GBP },
  { title: 'Japan', describe: 'Japan Yen', currency: CurrencyEnumType.JPY },
  { title: 'United States Of America', describe: 'United States Of America', currency: CurrencyEnumType.USD },
  { title: 'India', describe: 'Rupee', currency: CurrencyEnumType.INR },
  { title: 'Viet Nam', describe: 'Viet nam dong', currency: CurrencyEnumType.VND },
];
