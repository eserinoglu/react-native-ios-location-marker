import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useUser } from "../context/UserContext";

export default function SaveLocation({ coords }) {
  const { close } = useBottomSheet();
  const { savePin } = useUser();
  const [locationName, setLocationName] = useState("");
  return (
    <BottomSheetView className="flex-1 pt-1">
      <Text className="text-3xl font-bold tracking-tighter">Save location</Text>
      <View className="py-3 mt-4 border-t border-b border-black/10 flex-row items-center px-5">
        <View className="space-y-1">
          <Text className="font-medium text-base tracking-tight text-black/50">
            Coordinates
          </Text>
          <Text className="text font-medium tracking-tight">
            {coords?.latitude?.toFixed(5)}, {coords?.longitude?.toFixed(5)}
          </Text>
        </View>
        <View className="ml-auto">
          <Ionicons
            onPress={() => {
              Clipboard.setStringAsync(
                `${coords?.latitude}, ${coords?.longitude}`
              );
              alert("Copied to clipboard");
            }}
            name="ios-copy-outline"
            size={24}
            color="#006ee6"
          />
        </View>
      </View>
      <View className="mt-5 space-y-3">
        <BottomSheetTextInput
          value={locationName}
          onChangeText={setLocationName}
          clearButtonMode="always"
          placeholder="Name of the place"
          style={{
            fontSize: 16,
            backgroundColor: "#f2f2f2",
            paddingHorizontal: 10,
            paddingVertical: 14,
            borderRadius: 10,
          }}
        />
        <Pressable
          onPress={() => {
            savePin(locationName, coords.latitude, coords.longitude);
            close();
          }}
          className="w-full py-3 rounded-lg items-center bg-[#006ee6]"
        >
          <Text className="text-base font-semibold tracking-tight text-white">
            Save
          </Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
}
