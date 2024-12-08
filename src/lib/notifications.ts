import { create } from 'zustand';
import { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotifications = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, readAt: new Date().toISOString() } : n
      ),
    })),
  clearAll: () => set({ notifications: [] }),
}));

export function checkCallDuration(duration: number): boolean {
  const MAX_DURATION = 30 * 60; // 30 minutes
  return duration > MAX_DURATION;
}

export function checkCallFrequency(
  calls: { startTime: string; visitorId: string; prisonerId: string }[],
  threshold = 3
): boolean {
  const today = new Date().toISOString().split('T')[0];
  const todayCalls = calls.filter((call) => 
    call.startTime.startsWith(today)
  );

  return todayCalls.length >= threshold;
}