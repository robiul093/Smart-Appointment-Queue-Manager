export interface IAuthUser {
  email: string;
  role: 'admin' | 'user';
  userId: string;
}
