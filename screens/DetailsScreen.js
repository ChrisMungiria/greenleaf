import { View, Text, Pressable } from "react-native";
import React from "react";
import BackIcon from "react-native-vector-icons/Ionicons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50],
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

const DetailsScreen = ({ route, navigation }) => {
  const { name } = route.params;

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
      <Text className="text-2xl text-midnight_green font-bold">
        Quick settings
      </Text>
    </View>
  );
};

export default DetailsScreen;
