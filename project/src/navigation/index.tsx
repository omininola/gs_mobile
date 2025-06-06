import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Dashboard } from "./screens/Dashboard";
import { Reports } from "./screens/Reports";
import { ReportCreateScreen } from "./screens/ReportCreate";
import { UserScreen } from "./screens/User";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "user";
          if (route.name === "Reports") iconName = "list";
          if (route.name === "ReportCreate") iconName = "plus-square";
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Relatórios" }}
      />
      <Tab.Screen
        name="ReportCreate"
        component={ReportCreateScreen}
        options={{ title: "Criar" }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{ title: "Usuário" }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
        headerShown: false,
      },
    },

    Login: {
      screen: Login,
      options: {
        title: "Login",
        headerShown: false,
      },
    },

    Register: {
      screen: Register,
      options: {
        title: "Cadastre-se",
        headerShown: false,
      },
    },

    Dashboard: {
      screen: Dashboard,
      options: {
        title: "Dashboard",
        headerShown: false,
      },
    },

    MainTabs: {
      screen: BottomTabs,
      options: {
        headerShown: false,
      },
    },

    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
