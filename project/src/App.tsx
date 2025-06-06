import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { UserProvider } from "./context/UserContext";
import { CitiesProvider } from "./context/CitiesContext";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <UserProvider>
      <CitiesProvider>
        <Navigation
          linking={{
            enabled: "auto",
            prefixes: [
              // Change the scheme to match your app's scheme defined in app.json
              "helloworld://",
            ],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </CitiesProvider>
    </UserProvider>
  );
}
