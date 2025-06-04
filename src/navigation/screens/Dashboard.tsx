import { ScrollView } from "react-native";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import { Button } from "@react-navigation/elements";

export function Dashboard() {
  return (
    <ScrollView>
      <Banner
        title="Dashboard"
        imageUri="https://t4.ftcdn.net/jpg/04/94/94/33/360_F_494943379_C1DTG0LAHw2a0wmSeZDnd51dBLobHNR1.jpg"
      />

      <Container>
        <Button screen="Home">Home Page</Button>
      </Container>
    </ScrollView>
  );
}
