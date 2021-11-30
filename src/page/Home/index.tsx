import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BottomTabs, { BottomTabView } from '../../component/BottomTabs';
import { AuthService } from '../../service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Index: React.FC = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Test Test',
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <BottomTabs>
        <BottomTabView title="My Wish">
          <Text>My Wish</Text>
          <Button
            onPress={async () => {
              await AuthService.signUp('makersmelx@gmail.com', '123456');
            }}
            title="Sign Up"
          />
        </BottomTabView>
        <BottomTabView title="Claimed">
          <Text>heyhey</Text>
          <Button
            onPress={async () => {
              await AuthService.signIn('makersmelx@gmail.com', '123456');
            }}
            title="Login"
          />
        </BottomTabView>
        <BottomTabView title="Friends">
          <Text>heyhey234</Text>
        </BottomTabView>
        <BottomTabView title="Profile">
          <Text>heyhey2345</Text>
        </BottomTabView>
      </BottomTabs>
      <StatusBar />
    </View>
  );
};

export default Index;
