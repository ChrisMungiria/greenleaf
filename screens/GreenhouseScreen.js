import { View, Image, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CloseIcon from "react-native-vector-icons/AntDesign";
import DropIcon from "react-native-vector-icons/Ionicons";
import TemperatureIcon from "react-native-vector-icons/FontAwesome5";
import HumidityIcon from "react-native-vector-icons/Fontisto";
import LightIcon from "react-native-vector-icons/Entypo";
import { Dimensions } from "react-native";

// Query Data hook
import useFirebaseData from "../hooks/useFirebaseData";
import db, { auth } from "../firebase";
import { doc } from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GreenhouseScreen = ({ navigation }) => {
  const sensorData = useFirebaseData(db);

  // Sensor Limits
  const [moistureLimit, setMoistureLimit] = useState(0);
  const [temperatureLimit, setTemperatureLimit] = useState(0);
  const [lightLimit, setLightLimit] = useState(0);
  const [humidityLimit, setHumidityLimit] = useState(0);

  const getLimit = async (name) => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data().limits[name];
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getLimit("moisture").then((data) => setMoistureLimit(data));
    getLimit("temperature").then((data) => setTemperatureLimit(data));
    getLimit("lightLimit").then((data) => setLightLimit(data));
    getLimit("humidityLimit").then((data) => setHumidityLimit(data));
  }, []);

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
      <Text className="m-5 text-xl text-midnight_green">Greenhouse A</Text>
      <View className="flex gap-2 w-full h-fit p-4">
        <View className="flex flex-row gap-2">
          {/* Moisture */}
          <Pressable
            onPress={() => {
              navigation.navigate("DetailsScreen", {
                name: "Moisture",
              });
            }}
            className={`h-fit py-3 px-2 flex-1 rounded-md ${
              sensorData && sensorData.moisture > 500
                ? "bg-falu_red/20"
                : "bg-dun/20"
            }`}
          >
            <View className="flex flex-row items-center justify-between">
              <DropIcon
                name="water-outline"
                size={30}
                color={
                  sensorData && sensorData.moisture > 500
                    ? "#7B2D26"
                    : "#0B7A75"
                }
              />
              <Text
                className={`text-2xl ${
                  sensorData && sensorData.moisture > 500
                    ? "text-falu_red"
                    : "text-skobeloff"
                }`}
              >
                Moisture
              </Text>
            </View>
            <Text
              className={`text-2xl text-center font-bold my-4 ${
                sensorData && sensorData.moisture > 500
                  ? "text-falu_red"
                  : "text-skobeloff"
              }`}
            >
              {sensorData &&
                sensorData.moisture &&
                sensorData.moisture.toFixed(2)}
            </Text>
          </Pressable>
          {/* Temperature */}
          <Pressable
            onPress={() => {
              navigation.navigate("DetailsScreen", {
                name: "Temperature",
              });
            }}
            className={`
          h-fit py-3 px-2 flex-1 rounded-md
          ${
            sensorData &&
            sensorData.temperature < 20 &&
            sensorData.temperature > 30
              ? "bg-falu_red/20"
              : "bg-dun/20"
          }
          `}
          >
            <View className="flex flex-row items-center justify-between">
              <TemperatureIcon
                name="temperature-high"
                size={30}
                color={
                  sensorData &&
                  sensorData.temperature < 20 &&
                  sensorData.temperature > 30
                    ? "#7B2D26"
                    : "#0B7A75"
                }
              />
              <Text
                className={`text-2xl ${
                  sensorData &&
                  sensorData.temperature < 20 &&
                  sensorData.temperature > 30
                    ? "text-falu_red"
                    : "text-skobeloff"
                }`}
              >
                Temp.
              </Text>
            </View>
            <Text
              className={`text-2xl text-center font-bold my-4 ${
                sensorData &&
                sensorData.temperature < 20 &&
                sensorData.temperature > 30
                  ? "text-falu_red"
                  : "text-skobeloff"
              }`}
            >
              {sensorData &&
                sensorData.temperature &&
                sensorData.temperature.toFixed(2)}
              °C
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-row gap-2">
          {/* Light */}
          <Pressable
            onPress={() => {
              navigation.navigate("DetailsScreen", {
                name: "Light",
              });
            }}
            className={`h-fit py-3 px-2 flex-1 rounded-md ${
              sensorData && sensorData.light < 100
                ? "bg-falu_red/20"
                : "bg-dun/20"
            }`}
          >
            <View className="flex flex-row items-center justify-between">
              <LightIcon
                name="light-up"
                size={30}
                color={
                  sensorData && sensorData.light < 100 ? "#7B2D26" : "#0B7A75"
                }
              />
              <Text
                className={`text-2xl ${
                  sensorData && sensorData.light < 100
                    ? "text-falu_red"
                    : "text-skobeloff"
                }`}
              >
                Light
              </Text>
            </View>
            <Text
              className={`text-2xl text-center font-bold my-4 ${
                sensorData && sensorData.light < 100
                  ? "text-falu_red"
                  : "text-skobeloff"
              }`}
            >
              {sensorData && sensorData.light}
            </Text>
          </Pressable>
          {/* Humidity */}
          <Pressable
            onPress={() => {
              navigation.navigate("DetailsScreen", {
                name: "Humidity",
              });
            }}
            className={`h-fit py-3 px-2 flex-1 rounded-md ${
              sensorData && sensorData.humidity < 80
                ? "bg-falu_red/20"
                : "bg-dun/20"
            }`}
          >
            <View className="flex flex-row items-center justify-between">
              <HumidityIcon
                name="cloudy-gusts"
                size={30}
                color={
                  sensorData && sensorData.humidity < 80 ? "#7B2D26" : "#0B7A75"
                }
              />
              <Text
                className={`text-2xl ${
                  sensorData && sensorData.humidity < 80
                    ? "text-falu_red"
                    : "text-skobeloff"
                }`}
              >
                Humidity
              </Text>
            </View>
            <Text
              className={`text-2xl text-center font-bold my-4 ${
                sensorData && sensorData.humidity < 80
                  ? "text-falu_red"
                  : "text-skobeloff"
              }`}
            >
              {sensorData &&
                sensorData.humidity &&
                sensorData.humidity.toFixed(2)}
              %
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GreenhouseScreen;
