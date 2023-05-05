import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BookList from '../screens/BookList';
import BookDetails from '../screens/BookDetails';
import Wishlist from '../screens/Wishlist';

const Stack = createNativeStackNavigator();

const NavigationRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BookList"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoute;
