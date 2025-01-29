export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  cardId: string;
}

export type CreateUser = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export type UserAuth = Pick<User, 'cardId' | 'role'>;
