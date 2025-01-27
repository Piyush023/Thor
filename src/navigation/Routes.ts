export enum Routes {
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  EMAIL_SCREEN = 'EMAIL_SCREEN',
  EMAIL_OTP_SCREEN = 'EMAIL_OTP_SCREEN',
  SET_PASSWORD_SCREEN = 'SET_PASSWORD_SCREEN',
}

type EmailOtpParams = {
  email: string;
};

type SetPasswordParams = {
  email: string;
};

export type RootStackParamList = {
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.HOME_SCREEN]: undefined;
  [Routes.EMAIL_SCREEN]: undefined;
  [Routes.EMAIL_OTP_SCREEN]: EmailOtpParams;
  [Routes.SET_PASSWORD_SCREEN]: SetPasswordParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
