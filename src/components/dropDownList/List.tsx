import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Item, { ListItem } from './ListItems';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { appColorsType } from '../../redux/types/types';
export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
  theme: appColorsType;
  navigation: any;
  heading: string;
}

export default ({ list, theme, navigation, heading }: ListProps) => {
  const [open, setOpen] = useState(false);
  const height = open ? 'auto' : 0;
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.secondryBackgroundColor,
            },
          ]}>
          <Text style={[styles.title, {
            color: theme.textColor,
            fontSize: theme.appFontSize.mediumSize,
            fontFamily: theme.appFontSize.fontFamily
          }]}>
            {heading}
          </Text>
          <Ionicons
            style={{
              color: theme.secondry,
              fontSize: theme.appFontSize.smallSize - 3,
            }}
            name={'chevron-up'}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item
            theme={theme}
            navigation={navigation}
            {...{ item, key }}
          />
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    fontWeight: 'bold',
  },
  items: {
    overflow: 'hidden',
  }
});
