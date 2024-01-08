import { View, Text, Pressable, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import BackIcon from "react-native-vector-icons/Ionicons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
// Query Data hook
import useFirebaseData from "../hooks/useFirebaseData";
import db from "../firebase";
import EditLimit from "../components/EditLimit";
import useSetLimit from "../hooks/useSetLimit";

const windowWidth = Dimensions.get("window").width;

const guides = {
  moisture:
    "Most plants thrive in soil moisture content of between 20% and 60%, however it is differs slightly from flowers, trees, and shrubs; which require levels between 21% and 40%  and vegetables; which require levels between 41% and 80%",
  temperature:
    "Most common greenhouse crops require a temperature range of around 18º-26ºC.Temperatures above or below this range can stress the plant and slow down photosynthesis producing unhealthy crops and lower yields.",
  light:
    "For vegetables, they tend to fall within the medium-light (20,000 - 30,000 lux) and the high-light (Above 30,000 lux). Seedlings and young plants typically require higher light levels (around 20,000 to 40,000 lux) to promote healthy growth and prevent elongation due to insufficient light.",
  humidity:
    "While each plant is different, the ideal humidity level for most plants in a greenhouse is about 80%. At this level, growth rates are highest for common greenhouse plants. At higher or lower humidity levels, plant psychological processes may slow down. High relative humidity levels also drastically increase the susceptibility to common humidity diseases.",
};

const DetailsScreen = ({ route, navigation }) => {
  const [sensorDataArray, setSensorDataArray] = useState([0]);
  const { name } = route.params;

  const sensorData = useFirebaseData(db);

  const getSensorData = () => {
    if (name === "Moisture") {
      return sensorData.moisture;
    }
    if (name == "Light") {
      return sensorData.light;
    }
    if (name == "Temperature") {
      return sensorData.temperature;
    }
    if (name == "Humidity") {
      return sensorData.humidity;
    }
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: sensorDataArray,
        color: (opacity = 1) => `#0B7A75`,
        strokeWidth: 2,
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#F0F3F5",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#F0F3F5",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `#0B7A75`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  useEffect(() => {
    if (sensorData) {
      // Limit the array to 10 items using shift
      if (sensorDataArray.length > 10) {
        sensorDataArray.shift();
      }
      // Add the new data to the array
      setSensorDataArray([...sensorDataArray, getSensorData()]);

      console.log(sensorDataArray);
    }
  }, [sensorData]);

  return (
    <View className="w-screen h-screen bg-text_white pt-14 px-4">
      <Pressable
        className="flex flex-row items-center gap-x-2"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackIcon
          name="chevron-back-outline"
          size={30}
          color="#7B2D26"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-lg text-falu_red underline">Back</Text>
      </Pressable>
      <Text className="text-3xl text-skobeloff font-bold mt-2">{name}</Text>
      <LineChart
        className="mt-10 "
        data={data}
        width={windowWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
      <Text className="text-2xl text-midnight_green font-bold">Edit Limit</Text>
      <View className="w-full">
        <EditLimit name={name} />
      </View>

      <Text className="text-2xl text-midnight_green font-bold">
        {name === "Moisture" && "Moisture Guide"}
        {name === "Temperature" && "Temperature Guide"}
        {name === "Light" && "Light Guide"}
        {name === "Humidity" && "Humidity Guide"}
      </Text>
      <Text className="text-skobeloff text-xs leading-5">
        {name === "Moisture" && guides.moisture}
        {name === "Temperature" && guides.temperature}
        {name === "Light" && guides.light}
        {name === "Humidity" && guides.humidity}
      </Text>
    </View>
  );
};

export default DetailsScreen;
