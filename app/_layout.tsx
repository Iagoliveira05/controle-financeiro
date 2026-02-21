import "react-native-get-random-values";
import { Stack } from "expo-router";
import "../global.css";
import React from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack screenOptions={{headerShown:false}}/>
    </SafeAreaProvider>
  )
}

