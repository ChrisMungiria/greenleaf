import { View, Image, Pressable, Text } from "react-native";
import React from "react";
import CloseIcon from "react-native-vector-icons/AntDesign";
import DropIcon from "react-native-vector-icons/Ionicons";
import Co2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const plants = ["tomatoes", "cucumbers", "lettuce", "strawberries", "peppers"];

const GreenhouseScreen = ({ navigation }) => {
  return (
    <View className="w-screen h-screen">
      <View className="relative ">
        <Image
          source={require("../assets/greenhouse.png")}
          className="w-full"
          style={{
            height: (windowHeight * 1) / 4,
          }}
        />
        <Pressable
          onPress={() => navigation.navigate("HomeScreen")}
          style={{
            position: "absolute",
            top: windowHeight / 14,
            right: 20,
          }}
        >
          <CloseIcon name="closecircleo" size={20} color="#7B2D26" />
        </Pressable>
      </View>
      <View className="w-full h-fit p-5">
        <Text className="text-xl text-midnight_green">Greenhouse A</Text>
        <View className="mt-2 flex flex-row items-center justify-between">
          <Text>What are you growing?</Text>
          <SelectDropdown
            search
            defaultValueByIndex={0}
            buttonStyle={{
              borderWidth: 1,
              borderColor: "#0B7A75",
              borderRadius: 10,
              flex: 2 / 3,
            }}
            data={plants}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        {/* <View className="w-full grid grid-cols-2 gap-3">
          <View className="bg-dun/20 w-1/2 h-fit rounded-2xl p-2">
            <View className="flex flex-row items-center justify-around">
              <DropIcon name="water-outline" size={30} color="#0B7A75" />
              <Text className="text-skobeloff text-2xl">Moisture</Text>
            </View>
            <Text className="text-2xl w-full text-center mt-5 text-skobeloff font-bold">
              60%
            </Text>
          </View>
          <View className="bg-falu_red/20 w-1/2 h-32 rounded-2xl p-2">
            <View className="flex flex-row items-center justify-around">
              <Co2 name="molecule-co2" size={30} color="#7B2D26" />
              <Text className="text-falu_red text-2xl">CO2</Text>
            </View>
            <Text className="text-2xl w-full text-center mt-5 text-falu_red font-bold">
              1,500ppm
            </Text>
          </View>
        </View> */}

        <View
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: 10,
          }}
        >
          <View className="w-20 h-20 border border-red-500"></View>
          <View className="w-20 h-20 border border-red-500"></View>
          <View className="w-20 h-20 border border-red-500"></View>
          <View className="w-20 h-20 border border-red-500"></View>
        </View>
      </View>
    </View>
  );
};

export default GreenhouseScreen;
