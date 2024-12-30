import { View, StyleSheet, Image, useColorScheme } from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText/CustomText';
import { FONTS } from '../../constants/Fonts';
import { SCREENS_HEIGHT, SCREENS_WIDTH } from '../../utils/Scaling';
import { moderateVerticalScale } from 'react-native-size-matters';
import SocialLoginButton from '../../components/CustomButton/SocialLoginButton';
import LoginDark from '../../assets/images/login_animation_dark.png';
import LoginLight from '../../assets/images/login_animation_light.png';
import GoogleIcon from '../../assets/images/google.png';
import { Colors } from '../../constants/Colors';
import TouchAbleText from '../../components/CustomText/TouchAbleText';
import BottomText from '../../components/CustomText/BottomText';
import { signWithGoogle } from '../../redux/SocialLogin';
import { navigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
// import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen: React.FC = () => {
  const theme = useColorScheme();

  const imgPath = theme === 'dark' ? LoginDark : LoginLight;

  return (
    <View style={styles.container}>
      {/* Header and Image */}
      <CustomText variant={'h1'} fontFamily={FONTS.Medium}>
        Together We Groww
      </CustomText>
      <CustomText style={styles.subText} variant={'h6'} fontFamily={FONTS.Bold}>
        Invest · Pay · Loans
      </CustomText>
      <View style={styles.imageContainer}>
        <Image source={imgPath} style={styles.imageStyles} />
      </View>

      {/* Social Login Button */}
      <SocialLoginButton
        icon={<Image source={GoogleIcon} style={{ height: 20, width: 20 }} />}
        text={'Continue With Google'}
        onPress={() => signWithGoogle()}
      />

      {/* Commenting This out becoz for this Apple Dev Account Needed No Money Right Now - Broke AF */}
      {/* <SocialLoginButton
        icon={<Icon name={'logo-apple'} size={18} color={Colors.richBlack} />}
        text={'Continue With Apple'}
        onPress={() => {
          console.log('Continue With Apple');
        }}
      /> */}

      {/* Footer */}
      <TouchAbleText
        text={'Use Other email Id'}
        onPress={() => navigate(Routes.EMAIL_SCREEN)}
        style={styles.touchAbleText}
      />
      <BottomText />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    opacity: 0.7,
  },
  imageContainer: {
    width: SCREENS_WIDTH,
    height: SCREENS_HEIGHT * 0.45,
    marginVertical: moderateVerticalScale(30),
  },
  imageStyles: {
    width: '100%',
    height: '100%',
  },
  touchAbleText: {
    opacity: 0.7,
    color: Colors.themeColor,
    marginVertical: 30,
    marginTop: 20,
  },
});

export default LoginScreen;
