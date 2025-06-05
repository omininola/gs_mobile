import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { THING_SPEAK_API } from "../../libs/api";
import { ThingSpeakFeed } from "../../libs/types";
import { LineChart } from "react-native-chart-kit";
import DefaultText from "../../components/DefaultText";

export function Dashboard() {
  
  const [feeds, setFeeds] = useState<ThingSpeakFeed[]>([]);

  async function fetchThingSpeak(){
    try {
      const res = await fetch(THING_SPEAK_API);
      const data = await res.json();
      setFeeds(data.feeds);
    } catch(err) {
      console.log(err);
    } finally {

    }
  }

  useEffect(() => {
    fetchThingSpeak();
  }, [])

  const colors = {
    temperature: "rgba(255, 99, 132, 1)",
    humidity: "rgb(200, 255, 99)",
    airQuality: "rgb(99, 232, 255)",
    fireLevel: "rgb(248, 78, 211)",
  }

  const chartData = {
    labels: feeds.map(feed => {
      const date = new Date(feed.created_at);
      const hour = date.getHours().toString().padEnd(2, "0");
      const mins = date.getMinutes().toString().padEnd(2, "0");
      const timeString = hour.concat(":", mins);
      return timeString;
    }),

    datasets: [
      {
        data: feeds.map(feed => parseFloat(feed.field1 || "0")),
        color: () => colors.temperature,
        strokeWidth: 2
      },
      {
        data: feeds.map(feed => parseFloat(feed.field2 || "0")),
        color: () => colors.humidity,
        strokeWidth: 2
      },
      {
        data: feeds.map(feed => parseFloat(feed.field3 || "0")),
        color: () => colors.airQuality,
        strokeWidth: 2
      },
      {
        data: feeds.map(feed => parseFloat(feed.field4 || "0")),
        color: () => colors.fireLevel,
        strokeWidth: 2
      },
    ],
  }

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: () => "rgba(0, 0, 0, 1)",
    labelColor: () => "rgba(0, 0, 0, 1)",
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: '#000',
    },
  }

  return (
    <ScrollView>
      <Banner
        title="Dashboard"
        imageUri="https://t4.ftcdn.net/jpg/04/94/94/33/360_F_494943379_C1DTG0LAHw2a0wmSeZDnd51dBLobHNR1.jpg"
      />

      <Container>
        <Button screen="Home">Voltar para a Home</Button>

        {feeds.length > 0 && (
        <View>
          <View style={styles.legendContainer}>
            <View style={styles.legendField}>
              <View style={[styles.legendDot, { backgroundColor: colors.temperature }]} />
              <DefaultText>Temperatura</DefaultText>
            </View>

            <View style={styles.legendField}>
              <View style={[styles.legendDot, { backgroundColor: colors.humidity }]} />
              <DefaultText>Umidade</DefaultText>
            </View>

            <View style={styles.legendField}>
              <View style={[styles.legendDot, { backgroundColor: colors.airQuality }]} />
              <DefaultText>Qualidade do Ar</DefaultText>
            </View>

            <View style={styles.legendField}>
              <View style={[styles.legendDot, { backgroundColor: colors.fireLevel }]} />
              <DefaultText>Nível de Fogo</DefaultText>
            </View>
          </View>

          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>)}
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12
  },

  legendField: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  legendDot: {
    width: 20,
    height: 20,
    marginRight: 4,
    borderRadius: 50
  }
});