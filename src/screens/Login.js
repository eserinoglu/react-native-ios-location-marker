import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { supabase } from "../supabase/supabase";
import { ActivityIndicator } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  const login = async () => {
    setIsPending(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        setIsPending(false);
      }
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setIsPending(false);
    }
  };
  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold tracking-tighter mb-2">
        Welcome back!
      </Text>
      <Text className="text-black/50 tracking-tight text-xs mb-5">
        Login to continue using the app and save your bookmarks.
      </Text>
      <View className="bg-zinc-200 h-[1px] mb-5"></View>
      <View className="space-y-2">
        <TextInput
          value={email}
          returnKeyType="next"
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
          disabled={isPending}
          onPress={login}
          className="bg-[#006ee6] p-2 rounded-lg items-center"
        >
          {isPending ? (
            <ActivityIndicator color="white" className="py-1" />
          ) : (
            <Text className="text-white font-semibold tracking-tight text-lg">
              Login
            </Text>
          )}
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate("Signup")}
        className="items-center mt-20"
      >
        <Text className="tracking-tight text-black/50">
          Don't have an account? Sign up.
        </Text>
      </Pressable>
    </View>
  );
}
