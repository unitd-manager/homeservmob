import React from "react"
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack"
import SignInScreen from "../../screens/signInScreen"
import SignUpScreen from "../../screens/signUpScreen"
import LogoutScreen from "../../screens/LogoutScreen"
import TermsAndCondScreen from "../../screens/termsAndCondScreen"
import ForgotPasswordScreen from "../../screens/forgotPasswordScreen"

const Stack = createStackNavigator()

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
      <Stack.Screen name="TermsAndCondScreen" component={TermsAndCondScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
