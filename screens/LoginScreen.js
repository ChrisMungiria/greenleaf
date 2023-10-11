import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginScreen = ({ navigation }) => {
  // All variables used for logging in are stored in React States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login function that uses Firebase signInWithEmailAndPassword to log in a user using the email auth
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error logging in!");
        console.log(errorCode);
        console.log(errorMessage);
        // If wrong password, alert the user
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          alert("Wrong password!");
        }
        // If user not found, alert the user
        else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          alert("User not found!");
        }
      });
  };

  return (
    <View className="w-screen h-screen bg-skobeloff flex flex-col justify-end">
      <Text className="text-white text-4xl p-5">Log In</Text>
      <View
        className="w-screen h-60 bg-text_white rounded-t-3xl p-10"
        style={{
          height: (windowHeight * 3) / 4,
        }}
      >
        {/* Email Input */}
        <View className="mt-5">
          <Text className="text-skobeloff text-xl ">Email</Text>
          <TextInput
            className="border-2 border-dun rounded-xl p-2 mt-2"
            placeholder="example@mail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              height: 50,
            }}
            autoCapitalize="none"
          />
        </View>
        {/* Password Input */}
        <View className="mt-5">
          <Text className="text-skobeloff text-xl ">Password</Text>
          <TextInput
            className="border-2 border-dun rounded-xl p-2 mt-2"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              height: 50,
            }}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Login Button */}
        {/* Log In Button */}
        <Pressable
          onPress={() => handleLogin()}
          className="p-4 bg-skobeloff rounded-3xl flex items-center justify-center mt-5 mx-auto"
          style={{ width: (windowWidth * 1) / 3 }}
        >
          <Text className="text-white text-xl">Log In</Text>
        </Pressable>

        {/* This will go to sign up screen */}
        <Pressable
          className="mt-5"
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text className="text-falu_red mx-auto">
            Don't have an account? <Text className="underline">Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
