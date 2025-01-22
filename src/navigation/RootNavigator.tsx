import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import EmailScreen from '../screens/EmailScreen/EmailScreen';
import { Routes, RootStackParamList } from './Routes';
import EmailOtpScreen from '../screens/EmailOtpScreen/EmailOtpScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen/SetPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN_SCREEN}
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={Routes.EMAIL_SCREEN} component={EmailScreen} />
      <Stack.Screen
        name={Routes.EMAIL_OTP_SCREEN}
        component={EmailOtpScreen}
        initialParams={{
          email: '',
        }}
      />
      <Stack.Screen
        name={Routes.SET_PASSWORD_SCREEN}
        component={SetPasswordScreen}
        initialParams={{
          email: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
