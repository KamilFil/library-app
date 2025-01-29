export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  cardId: string;
}

export type UserNoPassword = Omit<UserEntity, 'password'>;
