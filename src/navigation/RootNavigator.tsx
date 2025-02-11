import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EmailOtpScreen from '../screens/EmailOtpScreen/EmailOtpScreen';
import EmailScreen from '../screens/EmailScreen/EmailScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen/SetPasswordScreen';
import { RootStackParamList, Routes } from './Routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
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
