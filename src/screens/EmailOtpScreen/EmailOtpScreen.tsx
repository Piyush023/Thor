import React, { FC, useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import CenteredLogo from '../../components/CenteredLogo/CenteredLogo';
import { useForm, Controller } from 'react-hook-form';
import CustomSubmitButton from '../../components/CustomButton/CustomSubmitButton';
import { navigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Routes';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Routes.EMAIL_OTP_SCREEN
>;

const EmailOtpScreen = ({ route }: Props) => {
  const { email: paramsEmail } = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      emailOtp: '',
    },
  });

  const [email, setEmail] = useState<string>(paramsEmail);
  // const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    setShowOTP(true);
    setEmail(data.email);
    setOtp(data.otp);
    // setPassword(data.password);
    // Navigation to EmailOTPScreen
    navigate(Routes.EMAIL_OTP_SCREEN);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigate(Routes.EMAIL_SCREEN)} />
      <CenteredLogo />

      {/* Input */}
      <ScrollView style={styles.inputContainer}>
        {/* Email */}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={'EMAIL ADDRESS'}
              autoFocus={false}
              placeholder={'Eg: me@gmail.com'}
              keyboardType={'email-address'}
              value={email}
              disabled={true}
              onBlur={onBlur}
              error={errors.email && errors.email.message}
            />
          )}
          name={'email'}
        />

        {/* Password */}
        {/* <Controller
          control={control}
          rules={{
        maxLength: 20,
        required: true,
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
          message:
            'Please enter a secure password containing 8-20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, #, $, etc.).',
        },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
        <CustomInput
          label={'ENTER PASSWORD'}
          autoFocus={false}
          placeholder={'8-20 Characters'}
          keyboardType={'visible-password'}
          value={value}
          onChangeCallBack={(newVal) => {
            onChange(newVal);
            setPassword(newVal);
          }}
          isPassword={true}
          onBlur={onBlur}
          error={errors.password?.message}
        />
          )}
          name={'password'}
        /> */}

        {/* EMAIL - OTP */}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^\d{6}$/,
              message: 'Enter a valid 6-digit OTP',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={'ENTER OTP'}
              autoFocus={false}
              placeholder={'Fill the OTP'}
              keyboardType={'number-pad'}
              value={otp}
              maxLength={6}
              resend={true}
              onBlur={onBlur}
              onChangeCallBack={(newVal) => setOtp(newVal)}
              error={errors.emailOtp && errors.emailOtp.message}
            />
          )}
          name={'emailOtp'}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomSubmitButton
          name={'VERIFY EMAIL ID '}
          disabled={otp.length < 6}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default EmailOtpScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginHorizontal: 10,
  },
});
