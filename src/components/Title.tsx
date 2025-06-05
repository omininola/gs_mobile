import { Text } from "@react-navigation/elements";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

export default function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
});
