import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab, { BottomTabView } from './component/BottomTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Index: React.FC = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <BottomTab>
      <BottomTabView title="test1">
        <Text>heyhey123</Text>
      </BottomTabView>
      <BottomTabView title="test2">
        <Text>heyhey234</Text>
      </BottomTabView>
      <BottomTabView title="test3">
        <Text>heyhey2345</Text>
      </BottomTabView>
    </BottomTab>
    <StatusBar />
  </View>
);

registerRootComponent(Index);
