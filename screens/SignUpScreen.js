import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignUpScreen = ({ navigation }) => {
  // All variables used for signing up are stored in React States
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // SignUp function that uses Firebase createUserWithEmailAndPassword to create a user using the email auth
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(async (userCredential) => {
        const docData = {
          id: userCredential.user.uid,
          arduinoNo: null,
          firstname: firstname,
          lastname: lastname,
          email: emailAddress,
        };
        // Add user to 'users' database
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), docData);
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating user!");
        console.log(errorCode);
        console.log(errorMessage);
        // If email is already in use, alert the user
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          alert("Email already in use!");
        }
      });
  };

  return (
    <View className="w-screen h-screen bg-skobeloff flex flex-col justify-end">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text className="text-white text-4xl p-5">Sign Up</Text>
        <View
          className="w-screen h-60 bg-text_white rounded-t-3xl p-10"
          style={{
            height: (windowHeight * 4) / 5,
          }}
        >
          {/* Firstname Input */}
          <View>
            <Text className="text-skobeloff text-xl ">Firstname</Text>
            <TextInput
              className="border-2 border-dun rounded-xl p-2 mt-2"
              placeholder="John"
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
              style={{
                height: 50,
              }}
            />
          </View>

          {/* Lastname Input */}
          <View className="mt-5">
            <Text className="text-skobeloff text-xl ">Lastname</Text>
            <TextInput
              className="border-2 border-dun rounded-xl p-2 mt-2"
              placeholder="Doe"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
              style={{
                height: 50,
              }}
            />
          </View>

          {/* Email Input */}
          <View className="mt-5">
            <Text className="text-skobeloff text-xl ">Email</Text>
            <TextInput
              className="border-2 border-dun rounded-xl p-2 mt-2"
              placeholder="example@mail.com"
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text)}
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

          {/* Sign Up Button */}
          <Pressable
            onPress={() => handleSignUp()}
            className="p-4 bg-skobeloff rounded-3xl flex items-center justify-center mt-5 mx-auto"
            style={{ width: (windowWidth * 1) / 3 }}
          >
            <Text className="text-white text-xl">Sign Up</Text>
          </Pressable>

          {/* Go to Login Screen */}
          <Pressable
            className="mt-5"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text className="text-falu_red mx-auto">
              Already have an account?{" "}
              <Text className="underline">Log in instead</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
