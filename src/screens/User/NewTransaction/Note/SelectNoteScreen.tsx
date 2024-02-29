import React from 'react';
import { Image } from 'react-native';

// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, Button, StyleService, useStyleSheet, Input } from '@ui-kitten/components';

// ----------------------------- Hooks ---------------------------------------
import { useLayout } from 'hooks';

// ----------------------------- Assets ---------------------------------------
import { Images } from 'assets/images';

// ----------------------------- Components && Elements -----------------------
import { Container, Content, LayoutCustom, NavigationAction, Text } from 'components';
import { INoteTransactionProps } from 'types/redux-types';
import { waitUtil } from 'utils';

interface ISelectNoteScreenProps {
  onSelect: React.Dispatch<React.SetStateAction<INoteTransactionProps | undefined>>;
  onClose(): void;
  note?: INoteTransactionProps | undefined;
}

const SelectNoteScreen: React.FC<ISelectNoteScreenProps> = ({ note, onSelect, onClose }) => {
  const styles = useStyleSheet(themedStyles);
  const { height, width } = useLayout();

  const [textNote, setTextNote] = React.useState<string | undefined>(note?.textNote);
  const [selectedImg, setSelectedImg] = React.useState(note?.images);
  const size = 80 * (width / 375);
  const img_size = { width: size, height: size };

  const _onDone = () => {
    onSelect({ textNote: textNote, images: selectedImg });
    waitUtil(750).then(() => {
      onClose();
    });
  };

  return (
    <Container style={[styles.container, { height: height }]} level="1">
      <TopNavigation
        title="Add Note"
        alignment="center"
        accessoryLeft={() => <NavigationAction onPress={onClose} />}
      />
      <Content contentContainerStyle={styles.content}>
        <Input
          style={styles.input}
          status="note"
          size="note"
          multiline
          onChangeText={setTextNote}
          value={textNote}
          textStyle={styles.textStyle}
          placeholder="Write something about transaction"
        />
        <Text marginBottom={16} marginLeft={2} category="h5">
          Photos
        </Text>
        <LayoutCustom horizontal wrap gap={8}>
          {/* @ts-ignore */}
          <Image source={Images.take_photo} style={[styles.image, img_size]} />
          {images.map((item, index) => {
            const isActive = item === selectedImg;
            return (
              <LayoutCustom
                key={index}
                onPress={() => {
                  setSelectedImg(item);
                }}>
                <Image
                  source={item}
                  //@ts-ignore
                  style={[styles.image, img_size, isActive && { borderColor: '#CFE1FD' }]}
                />
              </LayoutCustom>
            );
          })}
        </LayoutCustom>
      </Content>
      <Button children={'Done'} style={styles.button} onPress={_onDone} />
    </Container>
  );
};

export default SelectNoteScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 120,
  },
  textStyle: {
    marginHorizontal: 0,
  },
  image: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  button: {
    marginHorizontal: 8,
    marginBottom: 4,
  },
});

const images = [
  Images.photo_01,
  Images.photo_02,
  Images.photo_03,
  Images.photo_04,
  Images.photo_05,
  Images.photo_06,
  Images.photo_07,
];
