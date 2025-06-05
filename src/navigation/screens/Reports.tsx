import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import DefaultText from "../../components/DefaultText";
import { Button, Text } from "@react-navigation/elements";
import { City, Report } from "../../libs/types";
import ReportCard from "../../components/ReportCard";
import { API_URL_BASE } from "../../libs/api";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../../components/Dropdown";
import { useCities } from "../../context/CitiesContext";
import Title from "../../components/Title";

export function Reports() {
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) navigation.navigate("Login");
  }, [user]);

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [cityFilter, setCityFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<boolean>(false);

  async function fetchReports() {
    setLoading(true);

    let filter = "";
    const filterCity = cityFilter != "" ? `cidade=${cityFilter}` : "";
    const filterUser = userFilter ? `usuarioId=${user?.id}` : "";
    filter = filter.concat("?", filterCity, filterUser);

    try {
      const res = await fetch(`${API_URL_BASE}/relatorios${filter}`);
      const json = await res.json();
      const reports: Report[] = json.content;

      setReports(reports);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, [cityFilter, userFilter, user]);

  if (loading) {
    return (
      <View>
        <Banner
          title="Relatórios"
          imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
        />

        <Container>
          <Title>Lista de relatórios</Title>

          <Filters
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
          />

          <DefaultText>Carregando...</DefaultText>
        </Container>
      </View>
    );
  }

  return (
    <View>
      <Banner
        title="Relatórios"
        imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
      />

      <Container>
        <Title>Lista de relatórios</Title>

        <Filters
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
        />

        <FlatList
          data={reports}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => <ReportCard report={item} />}
        />
      </Container>
    </View>
  );
}

function Filters({
  cityFilter,
  setCityFilter,
  userFilter,
  setUserFilter,
}: {
  cityFilter: string;
  setCityFilter: React.Dispatch<React.SetStateAction<string>>;
  userFilter: boolean;
  setUserFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cities } = useCities();

  return (
    <View>
      <DefaultText>Filtros</DefaultText>

      <View style={styles.filterSection}>
        <Dropdown<City>
          label="nome"
          value="id"
          data={cities}
          placeholder="Selecione uma cidade"
          defaultValue={cityFilter}
          defaultLabel="Todas as cidades"
          onSelect={(city) => setCityFilter(city.nome)}
        />

        <Button onPress={() => setUserFilter((prev) => !prev)}>
          {userFilter ? "Todos relatórios" : "Meus relatórios"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSection: {
    marginVertical: 8,
    gap: 8,
  },
});
