import React, { memo } from 'react';
// ----------------------------- UI kitten -----------------------------------
import { Button, Icon, StyleService, TopNavigation, useStyleSheet, useTheme } from '@ui-kitten/components';
// ----------------------------- @Types -----------------------------------
import { RootStackParamList } from 'types/navigation-types';
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from '@react-navigation/native';
// ----------------------------- Hooks -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Components -----------------------------------
import { Container, Content, LayoutCustom } from 'components';
import SplashItem from './SplashItem';
import { Images } from 'assets/images';
import Pagination from './Pagination';
// ----------------------------- Reanimated 2 -----------------------------------
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue, withSpring } from 'react-native-reanimated';

const SplashScreen = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { width, height, top } = useLayout();
  const theme = useTheme();
  const progress = useSharedValue(0);

  const _onAppleLogin = () => {
    navigate('BottomBar');
  };
  const _onGoogleLogin = () => {
    navigate('BottomBar');
  };
  const _onFacebookLogin = () => {
    navigate('BottomBar');
  };

  return (
    <Container style={styles.container}>
      <TopNavigation style={styles.topNavigation} />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom style={{ zIndex: 100, height: 400 * (height / 812) }}>
          <Carousel
            data={DATA}
            scrollAnimationDuration={700}
            snapEnabled
            autoPlay
            width={width}
            onProgressChange={(e, _) => {
              progress.value = withSpring(_);
            }}
            vertical={false}
            style={{ width: width, height: 400 * (height / 812) }}
            height={400 * (height / 812)}
            renderItem={({ item, index, animationValue }) => (
              <SplashItem data={item} key={index} progress={animationValue} />
            )}
          />
          <LayoutCustom horizontal itemsCenter justify="center" mt={24}>
            {DATA.map((item, i) => {
              return (
                <Pagination
                  index={i}
                  key={i}
                  length={DATA.length}
                  backgroundColor={theme['text-basic-color']}
                  animValue={progress}
                  widthActiveIndicator={6}
                />
              );
            })}
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom gap={16} mh={16} mb={8}>
          <Button
            accessoryLeft={<Icon pack="assets" name="apple" />}
            children={'Continue with Apple'}
            status="control"
            style={styles.button}
            onPress={_onAppleLogin}
          />
          <Button
            accessoryLeft={<Icon pack="assets" name="gg" />}
            children={'Continue with Google'}
            status="google"
            style={styles.button}
            onPress={_onGoogleLogin}
          />
          <Button
            accessoryLeft={<Icon pack="assets" name="facebook" />}
            children={'Continue with Facebook'}
            style={styles.button}
            onPress={_onFacebookLogin}
          />
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default SplashScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  topNavigation: {
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 20,
  },
  button: {
    flex: 1,
  },
});
const DATA = [
  {
    image: Images.splash_01,
    title: 'Smart Wallet Management',
    describe: 'Allows you to create multiple wallets, transfer money between wallets',
  },
  {
    image: Images.splash_02,
    title: 'Quickly Create Transaction',
    describe: 'Create and manage the all your transactions quickly.',
  },
  {
    image: Images.splash_03,
    title: 'Gain Control Of Spending',
    describe: 'You’ll be able to track and gain control of your spending easily with charts',
  },
];
