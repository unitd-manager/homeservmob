import React, { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  I18nManager,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { HEIGHT } from '../components/config';
import CustomBtn from '../components/customBtn';
import { appColorsType } from '../redux/types/types';
import api from '../constants/api';
type RootStackParamList = {
  Settings: undefined;
};
interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  theme: appColorsType;
  reduxLang: any;
}

const App = ({ navigation, theme, reduxLang }: IProps) => {
  // Header Settings
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: reduxLang.ContactUs,
      headerStyle: {
        backgroundColor: theme.secondryBackgroundColor,
        shadowColor: 'transparent',
      },
      headerTintColor: theme.textColor,
    });
  }, [
    navigation,
    reduxLang.ContactUs,
    theme.secondryBackgroundColor,
    theme.textColor,
  ]);
  const [heightValue, setHeight] = React.useState(40);
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  let secondTextInput: any = '';
  let thirdTextInput: any = '';

  const onPressContact = () => {
    navigation.navigate('Settings');
  };

const createEnquiry=()=>{
  if (!name) {
    Alert.alert('User name information not found.');
    return;
  }
  if (!email) {
    Alert.alert('User email information not found.');
    return;
  }
  if (!phone) {
    Alert.alert('User comment information not found.');
    return;
  }
  api
      .post("/enquiry/insertEnquiry", {
       email,first_name:name,comments:phone
      })
      .then(res => {
          Alert.alert(
            'Contact saved successfully',
            'Thank you for contacting us. Your inquiry has been successfully registered.',
            [
               {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'ok',
                onPress: onPressContact,
              },
            ]
          );
          
      })
      .catch(err => {
        console.log(err)
      })
}
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          // behavior="height"
          keyboardVerticalOffset={5}
          behavior={'position'}
          style={styles.container}>
          <Image
            resizeMode={'contain'}
            style={[
              styles.drawerImageStyle,
            ]}
            source={require('../images/contactus2.png')}
          />

          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              },
            ]}
            onChangeText={(text) => onChangeName(text)}
            placeholder={reduxLang.FullName}
            placeholderTextColor={'gray'}
            value={name}
            onSubmitEditing={() => {
              secondTextInput.focus();
            }}
            blurOnSubmit={false}
          />

          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              },
            ]}
            onChangeText={(text) => onChangeEmail(text)}
            placeholder={reduxLang.Email}
            placeholderTextColor={'gray'}
            value={email}
            ref={(input) => {
              secondTextInput = input;
            }}
            onSubmitEditing={() => {
              thirdTextInput.focus();
            }}
            blurOnSubmit={false}
          />

          <TextInput
            style={[
              styles.textInput,
              styles.marginBot,
              {
                backgroundColor: theme.secondryBackgroundColor,
                color: theme.textColor,
                height: HEIGHT * 0.1 + heightValue,
                fontSize: theme.appFontSize.mediumSize,
                fontFamily: theme.appFontSize.fontFamily
              },
              styles.textAlignVertical,
            ]}
            onChangeText={(text) => onChangePhone(text)}
            placeholder={reduxLang.YourComment}
            placeholderTextColor={'gray'}
            value={phone}
            ref={(input) => {
              thirdTextInput = input;
            }}
            editable={true}
            multiline={true}
            onContentSizeChange={(e) =>
              setHeight(e.nativeEvent.contentSize.height)
            }
          />

          <CustomBtn onPressFun={() => { createEnquiry()}} theme={theme} title={reduxLang.Save}></CustomBtn>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginBot: {
    marginBottom: 16
  },
  drawerImageStyle: {
    height: HEIGHT * 0.3,
    width: '80%',
    margin: 20,
    alignSelf: 'center',
  },
  textInput: {
    borderColor: 'gray',
    width: '93%',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom: 6,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainerStyle: {
    paddingBottom: 5,
  },
  textAlignVertical: {
    textAlignVertical: 'top',
  },
});

const mapStateToProps = (state: any) => ({
  theme: state.configReducer.theme,
  reduxLang: state.configReducer.lang
});

export default connect(mapStateToProps, null)(App);
