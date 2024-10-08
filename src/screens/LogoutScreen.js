import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import RNRestart from "react-native-restart"
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = ({ navigation }) => {
  const logout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("USER_TOKEN");
    await AsyncStorage.removeItem("USER");
    // Redirect to the login screen
    RNRestart.Restart()
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text
              style={[
                styles.signUpText
              ]}
            >
              {'Go To Back'}
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  signUpText: {
    marginTop:20,
    color:'green',
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingBottom: "0.2%"
  }
});

export default connect(null, null)(LogoutScreen);
