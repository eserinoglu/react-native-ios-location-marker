import {
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase/supabase";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { userData, updateUserData } = useUser();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState(userData?.first_name);
  const [lastName, setLastName] = React.useState(userData?.last_name);
  const [isPending, setIsPending] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const logout = async () => {
    setIsPending(true);
    await supabase.auth.signOut();
    setIsPending(false);
  };
  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1 bg-white">
      <View className="p-3 w-[94%] mx-auto rounded-2xl bg-white shadow-md space-y-1 border border-black/10">
        <Ionicons name="ios-person-circle-outline" size={40} color="black" />
        <Text className="tracking-tight text-xl font-semibold">
          {userData?.first_name} {userData?.last_name}
        </Text>
        <Text className="tracking-tight text-black/50">{userData?.email}</Text>
      </View>
      <View className="px-4 mt-5 flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-black/50 tracking-tight text-xs">DETAILS</Text>
          <Button
            onPress={() => setIsEditMode(!isEditMode)}
            title={isEditMode ? "Cancel" : "Edit"}
          />
        </View>
        <View className="mt-2 space-y-3">
          <View>
            <Text className="text-black/50 tracking-tight ml-1 mb-1">
              First Name
            </Text>
            <View className="p-2 rounded-lg bg-zinc-100">
              {isEditMode ? (
                <TextInput
                  className="font-semibold tracking-tight"
                  style={{ fontSize: 16 }}
                  onChangeText={setFirstName}
                  value={firstName}
                />
              ) : (
                <Text className="tracking-tight text-[16px] font-semibold">
                  {userData?.first_name}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text className="text-black/50 tracking-tight ml-1 mb-1">
              Last Name
            </Text>
            <View className="p-2 rounded-lg bg-zinc-100">
              {isEditMode ? (
                <TextInput
                  className="font-semibold tracking-tight"
                  style={{ fontSize: 16 }}
                  onChangeText={setLastName}
                  value={lastName}
                />
              ) : (
                <Text className="tracking-tight text-[16px] font-semibold">
                  {userData?.last_name}
                </Text>
              )}
            </View>
          </View>
          {isEditMode && (
            <Pressable
              disabled={isUpdating}
              onPress={async () => {
                setIsUpdating(true);
                await updateUserData(firstName, lastName);
                setIsUpdating(false);
                setIsEditMode(false);
              }}
              className="bg-[#006ee6] p-3 rounded-lg items-center"
            >
              {isUpdating ? (
                <ActivityIndicator color="white" className="py-[2px]" />
              ) : (
                <Text className="text-white tracking-tight font-semibold text-base">
                  Save changes
                </Text>
              )}
            </Pressable>
          )}
        </View>
        <Pressable
          disabled={isPending}
          style={{ opacity: isPending ? 0.5 : 1 }}
          onPress={logout}
          className="bg-red-600 rounded-lg p-3 items-center mt-auto mb-3"
        >
          <Text className="text-white font-semibold tracking-tight text-base">
            LOG OUT
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
