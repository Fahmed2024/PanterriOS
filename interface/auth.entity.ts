export interface CommonRes {
  message: string;
  status?: number;
}

export interface LoginReq {
  email: string;
  password: string;
  userDevice?: string;
}

export interface LoginRes {
  message: string;
  isTwoFactorEnabled: boolean;
  isTwoFactorSetup: boolean;
  temporaryToken: string | null;
  fullName: string;
  accessToken: string | null;
  refreshToken: string | null;
  lastLogin: string;
}

export interface RefreshTokenReq {
  refreshToken: string;
}

export interface RefreshTokenRes {
  message: string;
  accessToken: string;
  refreshToken?: string;
}

export interface SendOtpReq {
  email: string;
}

export interface VerifyOtpReq {
  email: string;
  otp: string;
}

export interface VerifyOtpRes {
  message: string;
  passwordResetToken?: string;
}

export interface ResetPasswordReq {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface Login2FaReq {
  temporaryToken: string;
  code: string;
  deviceToken?: string;
}

export interface EnableTwoFactorReq {
  token: string;
}

export interface ToggleTwoFactorReq {
  isEnabled: boolean;
}

export interface GenerateTwoFactorRes {
  message: string;
  secret: string;
  qrCode: string;
  manualEntryKey: string;
}

export interface CreateUserReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userStatus: 'activated' | 'deactivated' | 'pending' | 'banned' | 'suspended' | 'archived';
  roles: string[];
  gender: string;
  department: string;
  dateOfBirth?: string;
  phoneNumber: string;
  appAccess?: string;
}

export interface UpdateUserReq {
  firstName: string;
  lastName: string;
  email: string;
  userStatus: 'activated' | 'deactivated' | 'pending' | 'banned' | 'suspended' | 'archived';
  roles: string[];
  gender: string;
  department: string;
  phoneNumber: string;
  appAccess?: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
