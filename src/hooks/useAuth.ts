import { useApi } from '../api/useApi.ts';
import { CreateUser, User, UserAuth } from '../types/user/user.ts';
import { useAuthStore } from '../store/useAuthStore.ts';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useNotificationStore } from '../store/useNotificationStore.ts';
import { AuthRole } from '../types/auth.ts';
import { useLogger } from './useLogger.ts';
import { LogActionError, LogActionInfo } from '../types/log.ts';

export const useAuth = () => {
  const { apiGet, apiPost } = useApi();
  const { setUser, user } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const { logInfo, logError } = useLogger();
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
      newUser.role = AuthRole.GUEST;

      const createdUser = await apiPost<UserAuth, User>('users', newUser);

      return {
        cardId: createdUser.cardId,
        role: createdUser.role,
        email: createdUser.email,
      };
    },
    onSuccess: async (data) => {
      setUser(data);
      logInfo(data.email, LogActionInfo.Register);
      showNotification('Konto zostało utworzone!', 'success');
      await navigate({ to: '/' });
    },
    onError: (error: Error, data) => {
      logError(data.email, LogActionError.Register, error.message);
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
        email: findUser.email,
      };
    },
    onSuccess: async (data) => {
      setUser(data);
      logInfo(data.email, LogActionInfo.Login);
      showNotification('Zalogowano pomyślnie!', 'success');
      await navigate({ to: '/' });
    },
    onError: (error: Error, data) => {
      logError(data.email, LogActionError.Login, error.message);
      showNotification(`${error.message}`, 'error');
    },
  });

  const logout = async () => {
    logInfo(user!.email, LogActionInfo.Logout);
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
