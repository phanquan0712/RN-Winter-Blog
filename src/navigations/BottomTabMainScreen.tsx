import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Home, Search, Add, Profile } from '../';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
const Tab = createBottomTabNavigator();

const BottomTabMainScreen = () => {
   const dispatch = useDispatch<any>()

   const screenOptions = ({ route }: any) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }: any) => {
         let iconName;
         if (route.name === 'Home') {
            iconName = focused
               ? 'home'
               : 'home-outline';
         } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
         } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
         } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
         }

         // You can return any component that you like here!
         return <Ionicons name={iconName as string} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      
   })
return (
   <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: true, headerTitleAlign: 'center', headerTitle: 'Winter'}}/>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Profile" component={Profile} />
   </Tab.Navigator>
)
}

export default BottomTabMainScreen;