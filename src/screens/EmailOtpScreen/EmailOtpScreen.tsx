import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import { View, StyleSheet, ScrollView } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import CenteredLogo from '../../components/CenteredLogo/CenteredLogo';
import { useForm, Controller } from 'react-hook-form';
import CustomSubmitButton from '../../components/CustomButton/CustomSubmitButton';
import { navigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Routes';
import CustomText from '../../components/CustomText/CustomText';
import { FONTS } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

type EmailOtpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.EMAIL_OTP_SCREEN
>;

const EmailOtpScreen: React.FC<EmailOtpScreenProps> = ({ route }) => {
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
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    console.log('click');
    setLoading(true);
    setEmail(data.email);
    setOtp(data.otp);
    // TODO - Implement OTP Validation
    // if(otp !== OTP_FROM_BACKEND){
    // setOtpError(true);
    // }
    navigate(Routes.SET_PASSWORD_SCREEN, { email });
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigate(Routes.EMAIL_SCREEN)} />
      <CenteredLogo />

      {/* Input */}
      <ScrollView style={styles.inputContainer}>
        {/* Email */}
        <CustomInput
          label={'EMAIL ADDRESS'}
          autoFocus={false}
          placeholder={'Eg: me@gmail.com'}
          keyboardType={'email-address'}
          value={email}
          disabled={true}
          error={errors.email && errors.email.message}
        />

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
              onChangeCallBack={(newVal) => {
                setOtp(newVal);
                onChange(newVal);
              }}
              error={errors.emailOtp?.message}
            />
          )}
          name={'emailOtp'}
        />
        {otpError && (
          <CustomText
            variant={'h4'}
            fontFamily={FONTS.Regular}
            style={styles.errorText}
          >
            Wrong OTP! 2 Attempts Remaining
          </CustomText>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomSubmitButton
          name={'VERIFY EMAIL ID '}
          disabled={otp?.length < 6}
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
    paddingHorizontal: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginHorizontal: 10,
  },
  errorText: {
    color: Colors.errorColor,
  },
});
