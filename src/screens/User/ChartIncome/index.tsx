import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  Spinner,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Assets ---------------------------------------
import { IMAGE_ICON_CATEGORY } from 'assets/IconCategory';
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Components && Elements -----------------------
import { VictoryPie } from 'victory-native';
import TransactionIncome from './TransactionIncome';
import {
  Container,
  Content,
  LayoutCustom,
  LinearGradientText,
  NavigationAction,
  Text,
} from 'components';
import { waitUtil } from 'utils';
import TabBar from './TabBar';

const ChartIncome = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const [activeIndex, setActiveIndex] = React.useState(8);
  const [loading, setLoading] = React.useState(false);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => (
          <LayoutCustom itemsCenter>
            <LinearGradientText text={'Income'} category="c1" />
            <Text category="h6">$1,280.00</Text>
          </LayoutCustom>
        )}
        accessoryLeft={() => <NavigationAction icon={'close'} />}
      />
      <LayoutCustom>
        <TabBar
          tabs={tabs}
          selected={activeIndex}
          onSelect={(index) => {
            setActiveIndex(index);
            setLoading(true);
            waitUtil(750).then(() => {
              setLoading(false);
            });
          }}
        />
      </LayoutCustom>
      {loading ? (
        <LayoutCustom itemsCenter justify="center" mt={80}>
          <Spinner size="giant" />
        </LayoutCustom>
      ) : (
        <Content contentContainerStyle={styles.content}>
          <LayoutCustom mb={40} mt={32}>
            <VictoryPie
              height={280 * (height / 812)}
              padding={{ top: 0 }}
              data={sampleData}
              labelRadius={95 * (height / 812)}
              radius={({ datum }) => (3 === datum.x ? 160 * (height / 812) : 140 * (height / 812))}
              innerRadius={80 * (height / 812)}
              style={{
                data: { fill: ({ datum }) => datum.color },
                labels: {
                  fill: theme['text-white-color'],
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: '700',
                },
              }}
            />
          </LayoutCustom>
          <LayoutCustom gap={8} ph={16}>
            {sampleData &&
              sampleData.map((item, index) => {
                return <TransactionIncome key={index} data={item.data} label={item.label} />;
              })}
          </LayoutCustom>
        </Content>
      )}
    </Container>
  );
});

export default ChartIncome;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom:0
  },
  content: {
    paddingBottom: 40,
  },
});
const tabs = [
  '01/2023',
  '02/2023',
  '03/2023',
  '04/2023',
  '05/2023',
  '06/2023',
  '07/2023',
  '08/2023',
  '09/2023',
  '10/2023',
  '11/2023',
  '12/2023',
];

const sampleData = [
  {
    x: 1,
    y: 60,
    color: '#106AF3',
    label: '60%',
    data: { image: IMAGE_ICON_CATEGORY.ic015, title: 'Salary', amount: '$12,468.00' },
  },
  {
    x: 2,
    y: 8,
    color: '#F6D938',
    label: '4%',
    data: { image: IMAGE_ICON_CATEGORY.ic039, title: 'Real Estate', amount: '$12,468.00' },
  },
  {
    x: 3,
    y: 16,
    color: '#C0A975',
    label: '16%',
    data: { image: IMAGE_ICON_CATEGORY.ic019, title: 'Interest', amount: '$12,468.00' },
  },
  {
    x: 4,
    y: 24,
    color: '#B1CEDE',
    label: '20%',
    data: { image: IMAGE_ICON_CATEGORY.ic001, title: 'Food & Drink', amount: '$12,468.00' },
  },
];
