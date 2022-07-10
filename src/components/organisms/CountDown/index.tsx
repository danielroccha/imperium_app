import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";

import { Caption } from "@app/components/atoms/Text";

type CountDownProps = {
  onFinish?: () => void;
  initialValue: number;
};

const CountDown = ({ onFinish, initialValue }: CountDownProps) => {
  const [time, setTime] = useState(initialValue);
  const timerRef = useRef(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        if (onFinish) onFinish();
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [onFinish]);

  const formatToTime = () => {
    const minutes =
      Math.floor(time / 60) > 9
        ? Math.floor(time / 60)
        : `0${Math.floor(time / 60)}`;

    const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;

    return `${minutes}:${seconds}`;
  };

  return (
    <View>
      <Caption color="primary">{formatToTime()} </Caption>
    </View>
  );
};

export default CountDown;
