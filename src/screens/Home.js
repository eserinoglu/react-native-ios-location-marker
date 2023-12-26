import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useUser } from "../context/UserContext";
import BottomSheet from "@gorhom/bottom-sheet";
import SaveLocation from "../components/SaveLocation";
import { Ionicons } from "@expo/vector-icons";
import CustomMarker from "../components/CustomMarker";

export default function Home({ navigation, route }) {
  const coords = route?.params?.coords;
  const { location, userBookmarks } = useUser();
  const [selectedCoords, setSelectedCoords] = useState(null);
  const mapRef = React.useRef(null);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = [295];
  const onLongPress = (event) => {
    setSelectedCoords(event.nativeEvent.coordinate);
    bottomSheetRef.current?.expand();
  };
  const onCloseSheet = () => {
    setSelectedCoords(null);
  };

  const showCurrentPosition = () => {
    mapRef.current.animateToRegion({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  React.useEffect(() => {
    if (coords) {
      mapRef.current.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [coords]);
  return (
    <View className="flex-1 relative">
      <StatusBar showHideTransition={"fade"} />
      <Pressable
        onPress={showCurrentPosition}
        className="absolute self-center bottom-5 bg-[#006ee6] z-10 p-2 rounded-lg flex-row items-center"
      >
        <Ionicons name="ios-navigate" size={20} color="white" />
        <Text className="text-white tracking-tight ml-1 font-medium">
          Current location
        </Text>
      </Pressable>
      {location ? (
        <MapView
          followsUserLocation
          ref={mapRef}
          onLongPress={onLongPress}
          showsUserLocation
          showsCompass
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {selectedCoords && (
            <Marker
              coordinate={{
                latitude: selectedCoords.latitude,
                longitude: selectedCoords.longitude,
              }}
            />
          )}
          {userBookmarks &&
            userBookmarks.map((bookmark) => (
              <Marker
                key={bookmark.id}
                coordinate={{
                  latitude: bookmark.latitude,
                  longitude: bookmark.longitude,
                }}
              >
                <CustomMarker bookmark={bookmark} />
              </Marker>
            ))}
        </MapView>
      ) : (
        <View className="flex-1 bg-white items-center justify-center">
          <ActivityIndicator color="blue" />
          <Text>Waiting for location...</Text>
        </View>
      )}
      <BottomSheet
        keyboardBehavior="interactive"
        onClose={onCloseSheet}
        enablePanDownToClose
        containerStyle={{
          zIndex: 11,
        }}
        backgroundStyle={{
          backgroundColor: "white",
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.17,
          borderRadius: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#00000020",
        }}
        style={{ paddingHorizontal: 16 }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <SaveLocation coords={selectedCoords} />
      </BottomSheet>
    </View>
  );
}
