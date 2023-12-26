import AppNavigation from "./src/navigation/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </GestureHandlerRootView>
  );
}
