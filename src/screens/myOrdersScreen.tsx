import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appColorsType } from '../redux/types/types';
import api from '../constants/api';
import AsyncStorage from "@react-native-async-storage/async-storage"


type RootStackParamList = {
  Settings: undefined;
  OrderDetails: { orderNo: string };
};

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  reduxLang: any;
}

const singleRow = (theme: appColorsType, key: string, value: string) => (
  <View style={styles.labelRow}>
    <Text
      numberOfLines={1}
      style={[styles.textStyle, {
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize - 1,
        fontFamily: theme.appFontSize.fontFamily,
      }]}>
      {key}
    </Text>
    <Text 
      numberOfLines={1}
      style={[styles.textStyle, {
        color: theme.textColor,
        fontSize: theme.appFontSize.mediumSize - 1,
        fontFamily: theme.appFontSize.fontFamily,
        fontWeight: 'bold'
      }]}>
      {value}
    </Text>
  </View>
);

const card = (theme: appColorsType, navigation: StackNavigationProp<RootStackParamList>, reduxLang: any, order: any) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('OrderDetails', { orderNo: order.order_id })}
    style={[
      styles.bodyTextStyle,
      {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: theme.secondryTextColor,
      },
    ]}>
    {singleRow(theme, reduxLang.Id, order.order_id)}
    {singleRow(theme, reduxLang.OrderDate, order.order_date)}
    {singleRow(theme, reduxLang.Status, order.order_status)}
    {singleRow(theme, reduxLang.PaymentMethod, order.payment_method)}
    {singleRow(theme, reduxLang.Total, order.total)}
  </TouchableOpacity>
);

const MyOrdersScreen = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.MyOrders,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [navigation, reduxLang.MyOrders, theme.secondryBackgroundColor, theme.textColor]);
  const [userContactId, setUserContactId] = useState(null);
  const [screen, setScreen] = useState(0);
  const [orders, setOrders] = useState([]); // State for orders
  const [selected] = useState([true, false, false, false]);
console.log('user',userContactId);
console.log('orders',orders);
  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await AsyncStorage.getItem('USER');
        const user = userData?JSON.parse(userData):null;
        setUserContactId(user && user.contact_id);
        if (user && user.contact_id) {
          const response = await api.post('/orders/getOrdersByContactId',{contact_id:user.contact_id});
          console.log('response',response);
          setOrders(response.data.data);
        }
        // else {
          // Alert.alert(
          //   'Please Login',
          //   'You need to log in to add items to the cart.',
          //   [
          //      {
          //       text: 'Cancel',
          //       style: 'cancel',
          //     },
          //     {
          //       text: 'Login',
          //       onPress: onPressSignIn,
          //     },
          //   ]
          // );
       // }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
      <View style={styles.container}>
        <FlatList
          data={[
            { title: reduxLang.OnHold },
            { title: reduxLang.Processing },
            { title: reduxLang.Completed },
          ]}
          horizontal={true}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-start'
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                selected.forEach((_, i) => (selected[i] = false));
                selected[index] = true;
                setScreen(index);
              }}
              style={{
                borderBottomWidth: selected[index] ? 2 : 0,
                borderColor: theme.primary,
              }}>
              <View style={styles.titleView}>
                <Text
                  style={{
                    fontSize: theme.appFontSize.mediumSize + 1,
                    color: selected[index] ? theme.primary : 'gray',
                    fontFamily: theme.appFontSize.fontFamily,
                    fontWeight: 'bold'
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.screenContainer}>
            {/* {orders.filter(order => order.order_status === ['On Hold', 'In Progress', 'Completed'][screen]).map(order => (
              card(theme, navigation, reduxLang, order)
            ))} */}
             {orders.map(order => (
              card(theme, navigation, reduxLang, order)
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5
  },
  screenContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    textAlign: 'left',
    padding: 5,
  },
  bodyTextStyle: {
    width: '94%',
    padding: 10,
    borderRadius: 12,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 2,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 4,
    margin: 10,
    marginTop: 5,
    borderRadius: 24,
  },
  scrollViewContainerStyle: {
    paddingBottom: 5,
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(MyOrdersScreen);
