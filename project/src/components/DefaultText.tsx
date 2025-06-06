import { Text } from "@react-navigation/elements";
import { PropsWithChildren } from "react";
import { StyleSheet, TextProps } from "react-native";

export default function DefaultText({
  children,
  ...props
}: PropsWithChildren & TextProps) {
  return (
    <Text style={[style.text, props.style]} {...props}>
      {children}
    </Text>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "justify",
  },
});
