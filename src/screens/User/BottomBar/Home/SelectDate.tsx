import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Icon,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useModalize } from "hooks";
// ----------------------------- Components && Elements -----------------------
import _ from "lodash";
import { Modalize } from "react-native-modalize";
import { LayoutCustom, Text } from "components";
import { Portal } from "react-native-portalize";

const SelectDate = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [month, setMonth] = React.useState(sample_option[0]);

  const showSelectMonth = () => {
    openMonth();
  };

  const {
    modalizeRef: modalSelectMonth,
    open: openMonth,
    close: closeMonth,
  } = useModalize();

  return (
    <>
      <LayoutCustom
        style={styles.selectDate}
        horizontal
        itemsCenter
        onPress={showSelectMonth}
      >
        <Text category="subhead">{month}</Text>
        <Icon pack="assets" name={"caret-down"} style={styles.caretDown} />
      </LayoutCustom>
      <Portal>
        <Modalize
          ref={modalSelectMonth}
          withHandle={false}
          snapPoint={260}
          modalStyle={{
            backgroundColor: theme["background-basic-color-1"],
            paddingTop: 32,
          }}
        >
          <LayoutCustom level="1" gap={30} itemsCenter>
            {sample_option.map((item, index) => {
              return (
                <LayoutCustom
                  key={index}
                  onPress={() => {
                    setMonth(item);
                    closeMonth();
                  }}
                >
                  <Text category="h4">{item}</Text>
                </LayoutCustom>
              );
            })}
          </LayoutCustom>
        </Modalize>
      </Portal>
    </>
  );
};

export default SelectDate;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  caret: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
  },
  selectDate: {
    backgroundColor: "background-basic-color-2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 99,
    gap: 8,
    height: 40,
  },
  caretDown: {
    width: 16,
    height: 16,
    tintColor: "text-basic-color",
  },
  contentContainer: {
    width: "100%",
    paddingBottom: 40,
  },
  modalStyle: {
    backgroundColor: "background-basic-color-1",
    padding: 24,
  },
});
const sample_option = ["May 2023", "April 2023", "March 2023", "All time"];
