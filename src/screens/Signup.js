import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { supabase } from "../supabase/supabase";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const signUp = async () => {
    setIsPending(true);
    try {
      const { data: authUser, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        setIsPending(false);
        return;
      }
      if (!error) {
        const { error } = await supabase
          .from("users")
          .update({ first_name: firstName, last_name: lastName, email })
          .eq("id", authUser.user.id);
      }
      setIsPending(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold tracking-tighter mb-2">
        Create an account
      </Text>
      <Text className="text-black/50 tracking-tight text-xs mb-5">
        Create an account to continue using the app and save your bookmarks.
      </Text>
      <View className="bg-zinc-200 h-[1px] mb-5"></View>
      <View className="space-y-2">
        <View className="flex-row items-center justify-between">
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            className="bg-zinc-100 p-3 rounded-lg w-[49%]"
            style={{ fontSize: 16 }}
            placeholder="First Name"
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            className="bg-zinc-100 p-3 rounded-lg w-[49%]"
            style={{ fontSize: 16 }}
            placeholder="Last Name"
          />
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="bg-zinc-100 p-3 rounded-lg"
          style={{ fontSize: 16 }}
          placeholder="Email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-zinc-100 p-3 rounded-lg"
          style={{ fontSize: 16 }}
          placeholder="Password"
        />
        <Pressable
          onPress={signUp}
          disabled={isPending}
          className="bg-[#006ee6] p-2 rounded-lg items-center"
        >
          {isPending ? (
            <ActivityIndicator color="white" className="py-1" />
          ) : (
            <Text className="text-white font-semibold tracking-tight text-lg">
              Sign Up
            </Text>
          )}
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        className="items-center mt-20"
      >
        <Text className="tracking-tight text-black/50">
          Already have an account? Login.
        </Text>
      </Pressable>
    </View>
  );
}
