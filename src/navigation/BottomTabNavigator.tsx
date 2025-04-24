import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Box, useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/main/Home';
import Wallet from '../screens/main/Wallet';
import Market from '../screens/main/Market';
import Profile from '../screens/main/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendMoney from '../screens/transactions/SendMoney';
import RequestMoney from '../screens/transactions/RequestMoney';
import TransactionDetails from '../screens/transactions/TransactionDetails';

// Define the main tab param list
export type MainTabParamList = {
  HomeTab: undefined;
  WalletTab: undefined;
  MarketTab: undefined;
  ProfileTab: undefined;
};

// Define the home stack param list
export type HomeStackParamList = {
  Home: undefined;
  SendMoney: undefined;
  RequestMoney: undefined;
  TransactionDetails: { id: string };
};

// Create stack navigator for Home tab to handle nested screens
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen 
        name="SendMoney" 
        component={SendMoney}
        options={{
          headerShown: true,
          headerTitle: 'Send Money',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <HomeStack.Screen 
        name="RequestMoney" 
        component={RequestMoney}
        options={{
          headerShown: true,
          headerTitle: 'Request Money',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <HomeStack.Screen 
        name="TransactionDetails" 
        component={TransactionDetails}
        options={{
          headerShown: true,
          headerTitle: 'Transaction Details',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  // Get theme colors
  const tabBarBg = useColorModeValue('white', 'dark.500');
  const activeColor = useColorModeValue('primary.500', 'primary.300');
  const inactiveColor = useColorModeValue('light.500', 'light.400');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WalletTab"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Feather name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MarketTab"
        component={Market}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
