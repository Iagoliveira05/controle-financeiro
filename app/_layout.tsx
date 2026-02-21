import "react-native-get-random-values";
import { Stack } from "expo-router";
import "../global.css";
import React from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:false}}/>
    </SafeAreaProvider>
  )
}

