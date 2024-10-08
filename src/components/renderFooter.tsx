import React from 'react';
import {
  ActivityIndicator
} from 'react-native';
import { appColorsType } from '../redux/types/types';

const renderFooter = (theme: appColorsType, loader: boolean) => (
  loader ? (
    <ActivityIndicator
      style={{ margin: 20 }}
      size={30}
      color={theme.primary}
    />
  ) : null
);

export default renderFooter;
