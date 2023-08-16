import React from 'react';
import MovieApp from '../screen/Movie';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Search} from '../screen/Search';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MovieApp" component={MovieApp} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
