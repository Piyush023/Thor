import {
  KeyboardTypeOptions,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ViewStyle } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import CustomText from '../CustomText/CustomText';
import { FONTS } from '../../constants/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchAbleText from '../CustomText/TouchAbleText';

interface CustomInputProps {
  label?: string;
  placeHolder?: string;
  onChangeCallBack?: (newVal: string) => void;
  placeholder: string;
  maxLength?: number;
  value: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoFocus?: boolean;
  disabled?: boolean;
  rightIcon?: ReactElement;
  onBlur?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  resend?: boolean;
  error?: string;
  //   inputState: InputStatesType;
  //   setInputState?: (state: InputStatesType) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  onChangeCallBack,
  placeholder,
  maxLength,
  value,
  keyboardType = 'default',
  autoFocus = false,
  disabled = false,
  rightIcon,
  onBlur,
  isPassword = false,
  resend = false,
  error,
  // customStyle = {},
}) => {
  const theme = useColorScheme();
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [timer, setTimer] = useState(30);

  const timeInterval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (start: boolean) => {
    if (start && !timeInterval.current) {
      timeInterval.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
        timeInterval.current = null;
      }
      setTimer(30);
    }
  }, [timer]);

  return (
    <View style={styles().container}>
      {label && (
        <View>
          <CustomText
            variant="h9"
            fontFamily={FONTS.Regular}
            style={{
              color: theme == 'dark' ? Colors.dark_text : Colors.richBlack,
            }}
          >
            {label}
          </CustomText>
        </View>
      )}
      <View
        style={[
          styles().inputContainer,
          {
            borderBottomWidth: isFocused ? 2 : 1,
            borderColor: isFocused ? Colors.themeColor : Colors.dark_border,
          },
        ]}
      >
        <TextInput
          value={value}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeCallBack}
          onBlur={() => {
            onBlur && onBlur();
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          placeholder={placeholder}
          cursorColor={colors.primary}
          style={styles(theme === 'dark').textInput}
          editable={!disabled}
          secureTextEntry={isPassword && isHidden}
          placeholderTextColor={Colors.light_text}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => {
              setIsHidden(!isHidden);
            }}
          >
            <Icon
              name={isHidden ? 'eye-off' : 'eye'}
              color={Colors.dark_text}
              size={RFValue(15)}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        )}
        {rightIcon && <View>{rightIcon}</View>}
        {resend && (
          <View>
            <TouchAbleText
              // TODO -  Need to implement the Resend API Logic Here
              onPress={() => startTimer(true)}
              style={{ marginRight: 0, color: Colors.dark_text }}
              text={timeInterval.current ? `Resend in ${timer}` : 'Resend'}
              disabled={!!timeInterval.current}
            />
          </View>
        )}
      </View>
      {error && (
        <CustomText variant={'h6'} style={{ color: Colors.errorColor }}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

export default CustomInput;

const styles = (isDarkTheme?: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      justifyContent: 'space-between',
    },
    textInput: {
      fontFamily: FONTS.Regular,
      fontSize: Platform.OS === 'ios' ? RFValue(11) : RFValue(13),
      alignItems: 'flex-start',
      height: 28,
      width: '80%',
      paddingVertical: 5,
      color: isDarkTheme ? Colors.dark_text : Colors.richBlack,
    },
  });
