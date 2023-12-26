import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Screens
import Home from "../screens/Home";
import Bookmarks from "../screens/Bookmarks";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const TabStack = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-map-outline" color={color} size={size} />
        ),
      }}
      name="Map"
      component={Home}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-bookmark-outline" color={color} size={size} />
        ),
      }}
      name="Bookmarks"
      component={Bookmarks}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="ios-person-circle-outline"
            color={color}
            size={size}
          />
        ),
      }}
      name="Profile"
      component={Profile}
    />
  </Tab.Navigator>
);

export default function AppNavigation() {
  const { user } = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Tab" component={TabStack} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
