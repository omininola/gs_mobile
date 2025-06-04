import MaskedView from "@react-native-masked-view/masked-view";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Banner({
  title,
  imageUri
}: {
  title: string;
  imageUri: string;
}) {
  return (
    <View style={styles.container}>
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View style={styles.centered}>
            <Text style={styles.text}>{title}</Text>
          </View>
        }
      >
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
  },

  image: {
    width: "100%",
    height: 80,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    color: "#000",
    fontSize: 64,
    fontWeight: 900,
    textTransform: "uppercase",
  }
});