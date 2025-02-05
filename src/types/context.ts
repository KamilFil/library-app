import { UserNoPassword } from './user/user';

export interface UserRoleContextInterface {
  user: UserNoPassword;
  setUser: (newRole: string) => void;
}

export const mockUser: UserNoPassword = {
  id: '54re',
  firstName: 'John',
  lastName: 'Doe',
  email: 'joe.doe@example.com',
  role: 'admin',
  cardId: 'hqwe78dgq23678tufas',
  isDeleted: false,
};
