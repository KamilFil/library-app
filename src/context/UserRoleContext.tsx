import { createContext } from 'react';
import { mockUser, UserRoleContextInterface } from '../types/context';

export const UserRoleContext = createContext<UserRoleContextInterface>({
  user: mockUser,
  setUser: () => {},
});
