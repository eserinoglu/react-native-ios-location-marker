import { View, Text } from "react-native";
import React from "react";

export default function CustomMarker({ bookmark }) {
  return (
    <View className="bg-sky-700 rounded-full p-2 shadow-xl">
      <Text className="text-white font-medium tracking-tight">
        {bookmark.name}
      </Text>
    </View>
  );
}
