import {
  Animated,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../CustomText/CustomText';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface CustomSubmitButtonProps {
  name: string;
  disabled?: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
  loading?: boolean;
}

const CustomSubmitButton: React.FC<CustomSubmitButtonProps> = ({
  name,
  disabled,
  onPress,
  loading,
}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();
    } else {
      animatedValue.stopAnimation();
    }
  }, [loading, animatedValue]);

  return (
    // TODO - Implement Touchable Ripple Effect in the button
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={styles(disabled).container}
    >
      <CustomText
        variant={'h5'}
        fontFamily={FONTS.Medium}
        style={{ color: Colors.light_card, opacity: disabled ? 0.5 : 1 }}
      >
        {name}
      </CustomText>
      {loading && (
        <Animated.View
          style={[
            styles().loadingBar,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-500, 500],
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomSubmitButton;

const styles = (disabled?: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 20,
      backgroundColor: disabled ? Colors.dark_card : Colors.themeColor,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      position: 'relative',
      overflow: 'hidden',
    },
    loadingBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.themeColor,
      width: '100%',
    },
  });
