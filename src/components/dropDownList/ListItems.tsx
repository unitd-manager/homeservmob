import React from 'react';
import { StyleSheet, Text, I18nManager } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { appColorsType } from '../../redux/types/types';
export const LIST_ITEM_HEIGHT = 40;

export interface ListItem {
  name: string;
  navigate?: string;
}

interface ListItemProps {
  item: ListItem;
  theme: appColorsType;
  navigation: any;
}

export default ({ item, theme, navigation }: ListItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => item.navigate ? navigation.navigate(item.navigate) : 
        navigation.navigate('shop')}
      style={[
        styles.container,
        {
          backgroundColor: theme.secondryBackgroundColor,
        },
      ]}>
      <Text numberOfLines={1} style={{
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize - 1,
        fontFamily: theme.appFontSize.fontFamily,
      }}>
        {item.name}
      </Text>
      <Ionicons
        style={{
          color: theme.secondry,
          fontSize: theme.appFontSize.smallSize - 3,
        }}
        name={!I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    height: LIST_ITEM_HEIGHT,
    marginTop: 1,
  }
});
