import * as React from "react";
import {
  TopNavigation,
  Input,
  StyleService,
  useStyleSheet,
  Button,
  useTheme,
} from "@ui-kitten/components";
import {
  Container,
  NavigationAction,
  Text,
  Content,
  LayoutCustom,
  LinearGradientText,
} from "components";
import TagCurrency from "components/TagCurrency";

const ModalBalance = ({
  onClose,
  balance,
  handleChangeBalance,
}: {
  onClose(): void;
  balance: number;
  handleChangeBalance: (t: string) => void;
}) => {
  const styles = useStyleSheet(themedStyles);
  const [isBalance, setIsBalance] = React.useState<number | string>(balance);
  const refBalance = React.useRef<Input>(null);

  return (
    <Container>
      <TopNavigation
        title={"Update Balance"}
        accessoryLeft={() => <NavigationAction onPress={onClose} />}
      />
      <Content>
        <LayoutCustom style={styles.page} mt={56}>
          <LayoutCustom horizontal justify="center">
            <LayoutCustom
              gap={5}
              itemsCenter
              onPress={() => {
                refBalance.current?.focus();
              }}
            >
              <LinearGradientText text={isBalance} category="h0" />
              <Text status="platinum" center>
                Initial balance
              </Text>
            </LayoutCustom>
            <LayoutCustom style={styles.tagCurrency}>
              <TagCurrency />
            </LayoutCustom>
          </LayoutCustom>
          <Input
            ref={refBalance}
            autoFocus
            style={{ opacity: 0, position: "absolute" }}
            keyboardType="numeric"
            onChangeText={(text) => {
              const sanitizedValue = text.replace(/,/g, "");
              if (!isNaN(parseInt(text))) {
                setIsBalance(sanitizedValue);
              } else {
                handleChangeBalance("0.00");
              }
            }}
          />
        </LayoutCustom>
      </Content>
      <Button
        children={"Confirm"}
        style={styles.buttonConfirm}
        onPress={() => {
          if (isBalance) {
            handleChangeBalance(isBalance.toString());
            onClose();
          }
        }}
      />
    </Container>
  );
};

export default ModalBalance;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  tagCurrency: {
    top: 0,
    position: "absolute",
    right: 0,
  },

  buttonConfirm: {
    marginHorizontal: 16,
    marginBottom: 4,
  },
});
