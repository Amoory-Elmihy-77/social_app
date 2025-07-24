export type userState = {
  token: null | string;
};

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}