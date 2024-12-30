export enum Routes {
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  EMAIL_SCREEN = 'EMAIL_SCREEN',
  EMAIL_OTP_SCREEN = 'EMAIL_OTP_SCREEN',
}

export type RootStackParamList = {
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.HOME_SCREEN]: undefined;
  [Routes.EMAIL_SCREEN]: undefined;
  [Routes.EMAIL_OTP_SCREEN]: { email: string };
};
