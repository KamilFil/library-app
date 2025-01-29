import { mockUser, UserRoleContextInterface } from '../../types/context';
import { createContext } from 'react';

export const UserRoleContext = createContext<UserRoleContextInterface>({
  user: mockUser,
  setUser: () => {},
});
