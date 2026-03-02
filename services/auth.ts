import {
  CommonRes,
  CreateUserReq,
  EnableTwoFactorReq,
  GenerateTwoFactorRes,
  Login2FaReq,
  LoginReq,
  LoginRes,
  RefreshTokenReq,
  RefreshTokenRes,
  ResetPasswordReq,
  SendOtpReq,
  ToggleTwoFactorReq,
  UpdateUserReq,
  VerifyOtpReq,
  VerifyOtpRes,
} from '@/interface';
import API from '@/services/axios';
import { UserProfileRes } from '@/interface/user-profile.entity';

export const getAppStatus = async (): Promise<CommonRes> => {
  const { data } = await API.get('/');
  return data;
};

export const createUser = async (payload: CreateUserReq): Promise<CommonRes> => {
  const { data } = await API.post('/api/v1/auth/admin/create-user', {
    ...payload,
    UserStatus: payload.userStatus,
  });
  return data;
};

export const login = async (payload: LoginReq): Promise<LoginRes> => {
  const { data } = await API.post('/api/v1/auth/login', payload);
  return data;
};

export const refreshAccessToken = async (
  payload: RefreshTokenReq,
): Promise<RefreshTokenRes> => {
  const { data } = await API.post('/api/v1/auth/refresh-token', payload);
  return data;
};

export const sendResetPasswordOtp = async (
  payload: SendOtpReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/api/v1/auth/send-reset-password-otp', payload);
  return data;
};

export const resendResetPasswordOtp = async (
  payload: SendOtpReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/api/v1/auth/resend-reset-password-otp', payload);
  return data;
};

export const verifyResetPasswordOtp = async (
  payload: VerifyOtpReq,
): Promise<VerifyOtpRes> => {
  const { data } = await API.post('/api/v1/auth/verify-reset-password-otp', payload);
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordReq,
): Promise<CommonRes> => {
  const { data } = await API.post('/api/v1/auth/reset-password', payload);
  return data;
};

export const getCurrentUser = async (
  accessToken?: string,
): Promise<UserProfileRes> => {
  const { data } = await API.get('/api/v1/auth/current-user', {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });
  return data;
};

export const generateTwoFactorSecret = async (): Promise<GenerateTwoFactorRes> => {
  const { data } = await API.post('/api/v1/two-factor-authentication/generate-secret');
  return data;
};

export const enableTwoFactor = async (
  payload: EnableTwoFactorReq,
): Promise<LoginRes> => {
  const { data } = await API.post('/api/v1/two-factor-authentication/enable', payload);
  return data;
};

export const loginWithTwoFactor = async (payload: Login2FaReq): Promise<LoginRes> => {
  const { data } = await API.post('/api/v1/two-factor-authentication/login-2fa', payload);
  return data;
};

export const toggleUserTwoFactor = async (
  userId: number,
  payload: ToggleTwoFactorReq,
): Promise<CommonRes> => {
  const { data } = await API.post(
    `/api/v1/two-factor-authentication/admin/${userId}/toggle`,
    payload,
  );
  return data;
};

export const updateUserDetails = async (
  userId: number,
  payload: UpdateUserReq,
): Promise<CommonRes> => {
  const { data } = await API.put(
    `/api/v1/user-management/admin/${userId}/update-details`,
    {
      ...payload,
      UserStatus: payload.userStatus,
    },
  );
  return data;
};

export const deleteUser = async (userId: number): Promise<CommonRes> => {
  const { data } = await API.delete(`/api/v1/user-management/admin/${userId}/delete`);
  return data;
};
