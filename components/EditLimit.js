import { View, Text, TextInput, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import useSetLimit from "../hooks/useSetLimit";

const windowWidth = Dimensions.get("window").width;

const EditLimit = ({ name }) => {
  const [limit, setLimit] = useState();

  const handleSubmit = () => {
    useSetLimit(limit, name);
    setLimit("");
  };

  return (
    <View className="w-full">
      <TextInput
        className="border-2 border-dun rounded-xl p-2 mt-2"
        placeholder="Enter a new limit"
        value={limit}
        onChangeText={(text) => setLimit(text)}
        style={{
          height: 50,
        }}
        keyboardType="numeric"
      />
      <Pressable
        className="bg-skobeloff rounded-3xl mx-auto py-2 flex items-center justify-center my-2"
        style={{
          width: (windowWidth * 1) / 2,
        }}
        onPress={handleSubmit}
      >
        <Text className="text-white">Set</Text>
      </Pressable>
    </View>
  );
};

export default EditLimit;
