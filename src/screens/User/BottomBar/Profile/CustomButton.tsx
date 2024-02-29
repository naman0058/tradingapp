import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { Icon, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from 'components';

interface ICustomButtonProps {
  icon: string;
  title: string;
  describe: string;
  onPress(): void;
}

const CustomButton: React.FC<ICustomButtonProps> = ({ icon, title, describe, onPress }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <LayoutCustom style={styles.container} onPress={onPress} horizontal justify="space-between">
      <LayoutCustom horizontal itemsCenter gap={16}>
        <LayoutCustom style={styles.layoutIcon}>
          <Icon pack="assets" name={icon} style={styles.icon} />
        </LayoutCustom>
        <LayoutCustom gap={4}>
          <Text category="h5">{title}</Text>
          <Text category="subhead" status="content">
            {describe}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <Icon
        pack="assets"
        name={'caret-right'}
        style={[styles.icon, { tintColor: theme['text-platinum-color'] }]}
      />
    </LayoutCustom>
  );
};

export default CustomButton;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'background-basic-color-2',
    alignItems: 'center',
  },
  content: {},
  layoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: `#3f4c59`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: 'text-basic-color',
  },
});
