import { useApi } from '../api/useApi.ts';
import { CreateUser, User, UserAuth } from '../types/user/user.ts';
import { useAuthStore } from '../store/useAuthStore.ts';

export const useAuth = () => {
  const { apiGet, apiPost } = useApi();
  const { setUser } = useAuthStore();

  const register = async (user: CreateUser): Promise<UserAuth | null> => {
    const users = await apiGet<User[]>('users');

    const findUser = users.find((findUser) => findUser.email === user.email);
    if (findUser) {
      throw new Error('User already exists');
    }

    const newUser = user as User;
    newUser.cardId = Math.random().toString(36).substring(7);
    newUser.role = 'user';

    const createdUser = await apiPost<UserAuth, User>('users', newUser);
    return {
      cardId: createdUser.cardId,
      role: createdUser.role,
    };
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<UserAuth | null> => {
    const users = await apiGet<User[]>('users');

    const findUser = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!findUser) {
      throw new Error('User not found');
    }
    setUser({
      cardId: findUser.cardId,
      role: findUser.role,
    });

    return {
      cardId: findUser.cardId,
      role: findUser.role,
    };
  };

  const logout = () => {
    setUser(null);
    return true;
  };

  return {
    login,
    register,
    logout,
  };
};
