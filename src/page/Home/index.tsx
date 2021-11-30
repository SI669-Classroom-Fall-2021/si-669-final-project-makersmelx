import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs, { BottomTabView } from '../../component/BottomTabs';

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
    <BottomTabs>
      <BottomTabView title="test1">
        <Text>heyhey123</Text>
      </BottomTabView>
      <BottomTabView title="test2">
        <Text>heyhey234</Text>
      </BottomTabView>
      <BottomTabView title="test3">
        <Text>heyhey2345</Text>
      </BottomTabView>
    </BottomTabs>
    <StatusBar />
  </View>
);

export default Index;
