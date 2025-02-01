import { useApi } from '../api/useApi.ts';
import { CreateUser, User, UserAuth } from '../types/user/user.ts';
import { useAuthStore } from '../store/useAuthStore.ts';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useNotificationStore } from '../store/useNotificationStore.ts';

export const useAuth = () => {
  const { apiGet, apiPost } = useApi();
  const { setUser } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (user: CreateUser) => {
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
    },
    onSuccess: async (data) => {
      setUser(data);
      showNotification('Konto zostało utworzone!', 'success');
      await navigate({ to: '/' });
    },
    onError: (error: Error) => {
      showNotification(`${error.message}`, 'error');
    },
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const users = await apiGet<User[]>('users');

      const findUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!findUser) {
        throw new Error('User not found');
      }

      return {
        cardId: findUser.cardId,
        role: findUser.role,
      };
    },
    onSuccess: async (data) => {
      setUser(data);
      showNotification('Zalogowano pomyślnie!', 'success');
      await navigate({ to: '/' });
    },
    onError: (error: Error) => {
      showNotification(`${error.message}`, 'error');
    },
  });

  const logout = async () => {
    setUser(null);
    await navigate({ to: '/sign-in' });
    showNotification('Zostałeś wylogowany!', 'success');
  };

  return {
    loginMutation,
    registerMutation,
    logout,
  };
};
