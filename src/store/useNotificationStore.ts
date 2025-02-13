import { create } from 'zustand';

interface NotificationState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  showNotification: (message: string, type: 'success' | 'error') => void;
  closeNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isOpen: false,
  message: '',
  type: 'info',
  showNotification: (message, type) => set({ isOpen: true, message, type }),
  closeNotification: () => set({ isOpen: false }),
}));
