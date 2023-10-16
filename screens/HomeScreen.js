import { Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import MenuIcon from "react-native-vector-icons/Feather";
import WaterIcon from "react-native-vector-icons/Ionicons";
import HumidityIcon from "react-native-vector-icons/Fontisto";
import TemperatureIcon from "react-native-vector-icons/FontAwesome";
import LightIcon from "react-native-vector-icons/Entypo";
import Co2 from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  // Firstname is stored in a state updated by a function that retrieves the user's firstname from the 'users' database
  const [firstname, setFirstname] = useState("");

  // Function that retrieves the user's firstname from the 'users' database
  const getUser = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      // setter for firstname state
      setFirstname(docSnap.data().firstname);
      console.log(firstname);
    } else {
      console.log("No such document!");
    }
  };

  const handleSignout = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };

  useEffect(() => {
    getUser();
    const unsbuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeScreen");
      }
    });
    return unsbuscribe;
  }, []);

  return (
    <View className="w-screen h-screen bg-skobeloff flex flex-col justify-end">
      <MenuIcon
        name="menu"
        size={40}
        color="#F0F3F5"
        style={{
          marginHorizontal: 15,
        }}
      />
      {/* Name is retrieved from 'users' database, which holds all user info */}
      <Text className="text-white text-4xl p-5">Hi, {firstname}</Text>
      <View
        className="w-screen h-60 bg-text_white rounded-t-3xl p-10"
        style={{
          height: (windowHeight * 3) / 4,
        }}
      >
        <Text className="text-midnight_green capitalize">Your greenhouses</Text>
        {/* This should be a pressable that moves to the greenhouse screen   */}
        <Pressable onPress={() => navigation.navigate("GreenhouseScreen")}>
          <View className="border border-[#C2C2C2] w-full h-fit rounded-xl mt-5">
            <Image
              source={require("../assets/greenhouse.png")}
              className="w-full h-auto object-cover rounded-t-xl"
            />
            <View className="w-full h-fit flex flex-row justify-around p-4">
              <View>
                <WaterIcon
                  name="water-outline"
                  size={20}
                  color="#0B7A75"
                  style={{ marginLeft: 1 }}
                />
                <Text className="text-center text-skobeloff">80%</Text>
              </View>
              <View>
                <HumidityIcon name="cloudy-gusts" size={20} color="#7B2D26" />
                <Text className="text-center text-falu_red">20%</Text>
              </View>
              <View>
                <TemperatureIcon
                  name="thermometer"
                  size={20}
                  color="#7B2D26"
                  style={{ marginLeft: 5 }}
                />
                <Text className="text-falu_red">20%</Text>
              </View>
              <View>
                <LightIcon
                  name="light-up"
                  size={20}
                  color="#0B7A75"
                  style={{ marginLeft: 2 }}
                />
                <Text className="text-skobeloff">60%</Text>
              </View>
              <View>
                <Co2
                  name="molecule-co2"
                  size={20}
                  color="#0B7A75"
                  style={{ marginLeft: 2 }}
                />
                <Text className="text-skobeloff">70%</Text>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={handleSignout}
          className="bg-red-500 px-4 py-2 rounded-xl w-fit h-fit"
        >
          <Text className="text-white">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
