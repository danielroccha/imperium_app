import {
  ILocalNotificationProvider,
  NOTIFICATION_IDENTIFIER,
  TNotificationConfig,
} from "@app/providers/localNotification";

export interface INotificationHook {
  scheduleNotification(notification: TNotificationConfig): Promise<void>;
  scheduleAllNotification(): Promise<void>;
  removeAllNotification(): Promise<void>;
  removeNotification(notificationId: NOTIFICATION_IDENTIFIER): Promise<void>;
}

const useNotification = (
  notificationProvider: ILocalNotificationProvider,
): INotificationHook => {
  const scheduleNotification = async (notification: TNotificationConfig) => {
    await notificationProvider.scheduleNotification(notification);
  };

  const scheduleAllNotification = async () => {
    await notificationProvider.scheguleAllNotifications();
  };

  const removeAllNotification = async () => {
    await notificationProvider.removeAllNofification();
  };

  const removeNotification = async (
    notificationId: NOTIFICATION_IDENTIFIER,
  ) => {
    await notificationProvider.removeNofification(notificationId);
  };

  return {
    scheduleNotification,
    removeNotification,
    removeAllNotification,
    scheduleAllNotification,
  };
};

export default useNotification;
