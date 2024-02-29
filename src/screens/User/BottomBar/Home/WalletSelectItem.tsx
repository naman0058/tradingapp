import React from 'react';
import { LayoutCustom, LinearGradientText, Text } from 'components';
import { IWalletProps } from 'types/redux-types';
import { StyleService, Icon, useStyleSheet } from '@ui-kitten/components';
import { convertPrice } from 'utils';

interface IWalletPropsProps {
  item: IWalletProps;
  onPress?():void
}

const WalletSelectItem: React.FC<IWalletPropsProps> = ({ item ,onPress}) => {
  const styles = useStyleSheet(themedStyles);

  const { title, balance } = item;
  return (
    <LayoutCustom style={styles.container} horizontal justify="center"onPress={onPress}>
      <Icon pack="assets" name={'cardholder'} />
      <LayoutCustom style={{ flex: 1, gap: 4 }}>
        <LinearGradientText text={title} category="h5" />
        <Text category="subhead">{convertPrice({ num: balance })}</Text>
      </LayoutCustom>
    </LayoutCustom>
  );
};

export default WalletSelectItem;

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    backgroundColor: 'background-basic-color-2',
    borderRadius: 16,
    marginBottom: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#B1CEDE',
  },
});
