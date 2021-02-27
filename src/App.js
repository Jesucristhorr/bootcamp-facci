import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home";
import Read from "./screens/Read";
import Create from "./screens/Create";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Detail from "./screens/Detail";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerTitle: "App de CRUD" }}
            />
            <Stack.Screen
              name="Read"
              component={Read}
              options={{ headerTitle: "Lista de usuarios" }}
            />
            <Stack.Screen
              name="Create"
              component={Create}
              options={{ headerTitle: "Crear un usuario" }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{ headerTitle: "Detalle del usuario" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

registerRootComponent(App);
