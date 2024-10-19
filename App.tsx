import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import StartApp from './src/router/index';
import {store, persistor} from './src/redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
      <WishlistProvider>
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <View style={styles.container}>
          <StartApp />
        </View>
      </PersistGate>
    </Provider>
    </WishlistProvider>
    </CartProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
