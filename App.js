import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ContactsScreen from './screens/ContactsScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          mode="modal"
          screenOptions={{
            headerTitleAlign: 'center'
          }}
          initialRouteName="Contacts">
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="QRCode" component={QRCodeScreen} />
          <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
