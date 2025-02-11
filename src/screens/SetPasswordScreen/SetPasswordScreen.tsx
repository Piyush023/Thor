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
import { Colors } from '../../constants/Colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Routes.SET_PASSWORD_SCREEN
>;

const SetPasswordScreen: React.FC<Props> = ({ route }) => {
  const { email: paramsEmail } = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [email, setEmail] = useState<string>(paramsEmail);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    setEmail(data.email);
    // TODO - Implement OTP Validation
    // if(otp !== OTP_FROM_BACKEND){
    // setOtpError(true);
    // }
    // setPassword(data.password);
    // Navigation to EmailOTPScreen
    // navigate(Routes.PASS);
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
        {/* Password */}
        <Controller
          control={control}
          rules={{
            maxLength: 20,
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
              message: `Password requirements:
- 8-20 characters long
- At least one uppercase letter
- At least one lowercase letter 
- At least one number
- At least one special character (@, #, $, etc.)`,
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
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomSubmitButton
          name={'NEXT'}
          disabled={password.length < 8}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default SetPasswordScreen;

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
