export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  cardId: string;
  isDeleted: boolean;
}

export type CreateUser = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export type UserAuth = Pick<User, 'cardId' | 'role' | 'email' | 'id'>;

export type UserNoPassword = Omit<User, 'password'>;

export type UserDto = Omit<User, 'id'>;

export type UserArchiveDto = {
  isDeleted: boolean;
};
