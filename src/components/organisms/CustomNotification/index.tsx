import React, { FC } from "react";
import { Notifier } from "react-native-notifier";
import Icon from "react-native-vector-icons/Feather";
import { View, SafeAreaView } from "react-native";
import { NOTIFICATION_TYPE, TypeNotification } from "@app/constants";
import { Regular, Body } from "@app/components/atoms/Text";
import { colors } from "@app/configs/Theme";
import styles from "./styles";

type NotificationProps = {
  title: string;
  description: string;
};

const WarningNotification: FC<NotificationProps> = ({
  title,
  description,
}: NotificationProps) => {
  const theme = colors();
  return (
    <SafeAreaView style={styles(theme).warning}>
      <View style={styles(theme).container}>
        <Icon name="alert-triangle" size={30} color={theme.white} />
        <View style={styles(theme).containerText}>
          <Regular color="white" style={styles(theme).title}>
            {title}
          </Regular>
          {!!description && (
            <Body style={styles(theme).description} color="white">
              {description}
            </Body>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const SuccessNotification: FC<NotificationProps> = ({
  title,
  description,
}: NotificationProps) => {
  const theme = colors();
  return (
    <SafeAreaView style={styles(theme).success}>
      <View style={styles(theme).container}>
        <Icon name="check" size={30} color={theme.white} />
        <View style={styles(theme).containerText}>
          <Regular color="white" style={styles(theme).title}>
            {title}
          </Regular>
          {!!description && (
            <Body style={styles(theme).description} color="white">
              {description}
            </Body>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const ErrorNotification: FC<NotificationProps> = ({
  title,
  description,
}: NotificationProps) => {
  const theme = colors();
  return (
    <SafeAreaView style={styles(theme).error}>
      <View style={styles(theme).container}>
        <Icon name="alert-circle" size={30} color={theme.white} />
        <View style={styles(theme).containerText}>
          <Regular color="white" style={styles(theme).title}>
            {title}
          </Regular>
          {!!description && (
            <Body style={styles(theme).description} color="white">
              {description}
            </Body>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const InfoNotification: FC<NotificationProps> = ({
  title,
  description,
}: NotificationProps) => {
  const theme = colors();
  return (
    <SafeAreaView style={styles(theme).default}>
      <View style={styles(theme).container}>
        <Icon name="info" size={30} color={theme.white} />
        <View style={styles(theme).containerText}>
          <Regular color="white" style={styles(theme).title}>
            {title}
          </Regular>
          {!!description && (
            <Body style={styles(theme).description} color="white">
              {description}
            </Body>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const DefaultNotification: FC<NotificationProps> = ({
  title,
  description,
}: NotificationProps) => {
  const theme = colors();
  return (
    <SafeAreaView style={styles(theme).default}>
      <View style={styles(theme).container}>
        <Icon name="bell" size={30} color={theme.white} />
        <View style={styles(colors).containerText}>
          <Regular color="white" style={styles(theme).title}>
            {title}
          </Regular>
          {!!description && (
            <Body style={styles(theme).description} color="white">
              {description}
            </Body>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const getComponent = (type: TypeNotification | null) => {
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESS:
      return SuccessNotification;
    case NOTIFICATION_TYPE.WARNING:
      return WarningNotification;
    case NOTIFICATION_TYPE.INFO:
      return InfoNotification;
    case NOTIFICATION_TYPE.ERROR:
      return ErrorNotification;
    default:
      return DefaultNotification;
  }
};

const showNotification = (
  title: string,
  message: string,
  type: TypeNotification | null,
  duration = 3000,
  onPress?: () => void,
): void =>
  Notifier.showNotification({
    title,
    duration: 3000,
    description: message,
    Component: getComponent(type),
    onPress,
  });

export default showNotification;
