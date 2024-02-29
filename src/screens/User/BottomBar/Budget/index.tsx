import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';

// ----------------------------- Components && Elements -----------------------
import EmptyBudget from './EmptyBudget';
import { Container, Content, LayoutCustom, LinearGradientText, Text } from 'components';
import AnimatedCircularProgress from 'elements/CircleProgress/AnimatedCircularProgress';
import BudgetItem from './BudgetItem';

// ----------------------------- Reduxs --------------------------------------
import { useAppSelector } from 'reduxs/store';
import { appSelector } from 'reduxs/reducers/app-reducer';

// ----------------------------- Others --------------------------------------
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const BudgetScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const budget = useAppSelector(appSelector).budget;

  return (
    <Container style={styles.container}>
      <TopNavigation title={'Budget'} alignment="center" />
      <Content contentContainerStyle={styles.content}>
        {isEmpty(budget) ? (
          <EmptyBudget />
        ) : (
          <LayoutCustom>
            <LayoutCustom itemsCenter>
              <LinearGradientText
                category="body"
                text={dayjs(budget.create_at).format('MMMM YYYY')}
              />
            </LayoutCustom>
            <LayoutCustom mt={20}>
              <LayoutCustom itemsCenter>
                <AnimatedCircularProgress
                  size={215}
                  width={9}
                  backgroundWidth={3}
                  fill={83}
                  tintColor={theme['text-success-color']}
                  tintColorSecondary={theme['color-primary-default']}
                  backgroundColor={theme['background-basic-color-2']}
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round">
                  {(fill: number) => (
                    <LayoutCustom itemsCenter gap={8}>
                      <Text category="h0">{Math.round((100 * fill) / 100)}%</Text>
                      <LayoutCustom itemsCenter horizontal>
                        <Text status="basic" category="h4">
                          $1,967/
                        </Text>
                        <Text status="fade" category="body">
                          $2,468
                        </Text>
                      </LayoutCustom>
                    </LayoutCustom>
                  )}
                </AnimatedCircularProgress>
              </LayoutCustom>
              <LayoutCustom mh={24}>
                {budget.budgets &&
                  budget.budgets.map((budget, index) => {
                    return <BudgetItem key={index} budget={budget} />;
                  })}
              </LayoutCustom>
            </LayoutCustom>
          </LayoutCustom>
        )}
      </Content>
    </Container>
  );
});

export default BudgetScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom:0
  },
  content: {
    paddingBottom: 80,
  },
});
