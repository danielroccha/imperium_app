import { Platform } from "react-native";

import NotificationSounds from "react-native-notification-sounds";

import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import I18n from "i18n-js";

export interface ILocalNotificationProvider {
  scheduleNotification: (notification: TNotificationConfig) => Promise<void>;
  scheguleAllNotifications: () => Promise<void>;
  removeNofification: (
    notificationId: NOTIFICATION_IDENTIFIER,
  ) => Promise<void>;
  removeAllNofification: () => Promise<void>;
}

type TNotificationData = {
  title: string;
  message: string;
};

export enum NOTIFICATION_IDENTIFIER {
  DAILY_MORNING = "DAILY_MORNING",
  DAILY_EVENING = "DAILY_EVENING",
}

export type TNotificationConfig = {
  id: NOTIFICATION_IDENTIFIER;
  data: TNotificationData;
  frequency: "DAILY" | "NONE";
  date: Date;
};

const scheduleNotification = async (notification: TNotificationConfig) => {
  const { data, date } = notification;
  const currentDate = new Date();

  if (date < currentDate) {
    date.setDate(date.getDate() + 1);
  }

  const soundsList = await NotificationSounds.getNotifications("notification");

  const notificationSound = soundsList[0].url;
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency[notification.frequency],
  };

  let channelId = "";
  if (Platform.OS === "android") {
    channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      sound: notificationSound,
    });
  }

  await notifee.createTriggerNotification(
    {
      id: notification.id,
      title: data.title,
      body: data.message,
      android: {
        sound: notificationSound,
        channelId,
        pressAction: {
          id: "default",
        },
      },
    },
    trigger,
  );
};

const scheguleAllNotifications = async () => {
  const dailyNotificationDate = new Date();
  dailyNotificationDate.setHours(12, 0, 0);

  const dailyNotification: TNotificationConfig = {
    id: NOTIFICATION_IDENTIFIER.DAILY_MORNING,
    frequency: "DAILY",
    date: dailyNotificationDate,
    data: {
      title: I18n.t("notifications.daily_title"),
      message: I18n.t("notifications.daily_message"),
    },
  };

  const eveningNotificationDate = new Date();
  eveningNotificationDate.setHours(19, 30, 0);

  const eveningNotification: TNotificationConfig = {
    id: NOTIFICATION_IDENTIFIER.DAILY_EVENING,
    frequency: "DAILY",
    date: eveningNotificationDate,
    data: {
      title: I18n.t("notifications.daily_title"),
      message: I18n.t("notifications.daily_message"),
    },
  };

  const notifications = [dailyNotification, eveningNotification];

  const promises = notifications.map(async notification => {
    await scheduleNotification(notification);
  });

  await Promise.all(promises);
};

const removeNofification = async (notificationId: NOTIFICATION_IDENTIFIER) => {
  await notifee.cancelNotification(notificationId);
};

const removeAllNofification = async () => {
  await notifee.cancelAllNotifications();
};

const localNotificationProvider: ILocalNotificationProvider = {
  scheduleNotification,
  scheguleAllNotifications,
  removeNofification,
  removeAllNofification,
};

export default localNotificationProvider;
