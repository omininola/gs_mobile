import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CitiesProvider } from './context/CitiesContext';
import { UserProvider } from './context/UserContext';
import { Navigation } from './navigation';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <UserProvider>
                <CitiesProvider>
                    <Navigation
                        linking={{
                            enabled: 'auto',
                            prefixes: [
                                // Change the scheme to match your app's scheme defined in app.json
                                'helloworld://',
                            ],
                        }}
                        onReady={() => {
                            SplashScreen.hideAsync();
                        }}
                    />
                </CitiesProvider>
            </UserProvider>
        </GestureHandlerRootView>
    );
}
