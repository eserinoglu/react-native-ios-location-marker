import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

export default function Bookmarks({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchInput, setSearchInput] = React.useState("");
  const { userBookmarks } = useUser();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const titleFontsize = scrollY.interpolate({
    inputRange: [-150, 0],
    outputRange: [36, 30],
    extrapolate: "clamp",
  });
  const search = () => {
    return userBookmarks?.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  return (
    <View style={{ paddingTop: insets.top + 10 }} className="flex-1 bg-white">
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.View className="h-10">
          <Animated.Text
            style={{ fontSize: titleFontsize }}
            className="font-bold tracking-tighter px-4"
          >
            Pins
          </Animated.Text>
        </Animated.View>
        <TextInput
          onChange={search}
          clearButtonMode="always"
          keyboardType="web-search"
          value={searchInput}
          onChangeText={setSearchInput}
          className="bg-black/10 rounded-lg px-3 py-2 mt-2 tracking-tight w-[93%] mx-auto"
          placeholder="Search pins"
          style={{ fontSize: 16 }}
        />
        {userBookmarks?.length === 0 && (
          <View className="pt-20 items-center justify-center">
            <Text className="text-base tracking-tight text-black/50">
              You don't have any pins yet.
            </Text>
          </View>
        )}
        <FlatList
          className="mt-2 px-4"
          data={search()}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <PinBox item={item} navigation={navigation} />
          )}
        />
      </Animated.ScrollView>
    </View>
  );
}

function PinBox({ item, navigation }) {
  const { deletePin } = useUser();
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => deletePin(item.id)}
          className="bg-red-500 flex-row items-center justify-center rounded-lg w-12"
        >
          <Ionicons name="ios-trash" size={24} color="white" />
        </TouchableOpacity>
      )}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("Map", {
            coords: { latitude: item.latitude, longitude: item.longitude },
          })
        }
        className="bg-white rounded-lg flex-row items-center border-b border-black/10 py-3 px-1"
      >
        <View>
          <Text className="font-medium tracking-tight text-lg">
            {item.name}
          </Text>
          <Text className="text-xs text-black/50 tracking-tight">
            {dayjs(item.created_at).format("DD MMMM YYYY")}
          </Text>
        </View>
        <View className="ml-auto">
          <Ionicons name="ios-chevron-forward" size={24} color="#00000050" />
        </View>
      </Pressable>
    </Swipeable>
  );
}
