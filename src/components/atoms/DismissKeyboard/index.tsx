import React, { ReactNode } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
type DismissKeyboardProps = {
  children: ReactNode;
};

const DismissKeyboard = ({ children }: DismissKeyboardProps) => {
  const handleDismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleDismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
