import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const SplashScreen = ({ navigation }) => {
  // Simple Splash screen with button to move to the sign up page
  return (
    <View className="w-screen h-screen bg-midnight_green">
      <StatusBar style="auto" />
      <Image
        source={require("../assets/background.png")}
        className="w-full h-auto"
      />
      <Text className="capitalize text-text_white text-5xl text-center font-bold">
        Manage your greenhouse
      </Text>
      <Text className="w-2/3 text-text_white mx-auto text-center mt-5">
        Start your journey in automated greenhouse management
      </Text>
      <Pressable
        onPress={() => navigation.navigate("LoginScreen")}
        className="w-1/2 bg-skobeloff flex items-center justify-center py-5 mx-auto rounded-2xl mt-5"
      >
        <Text className="capitalize text-text_white">Get started</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
