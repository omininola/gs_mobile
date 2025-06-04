import { StyleSheet, View } from "react-native";
import { Button, Text } from "@react-navigation/elements";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Input from "../../components/Input";
import { City, ReportCreate } from "../../libs/types";
import { useCities } from "../../context/CitiesContext";
import Dropdown from "../../components/Dropdown";
import DefaultText from "../../components/DefaultText";
import { API_URL_BASE } from "../../libs/api";
import Title from "../../components/Title";

export function ReportCreateScreen(){
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) navigation.navigate("Login");
  }, [user])

  const { cities } = useCities();
  const [report, setReport] = useState<ReportCreate>({
    cidadeId: 0,
    usuarioId: user?.id || 0,
    descricao: "",
  });
  
  const [message, setMessage] = useState<string>("");
  async function handleSubmit(){
    try {
      const res = await fetch(
        `${API_URL_BASE}/relatorios/usuario`, 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(report)
        }
      );

      if (res.ok) {
        setMessage("Relatório criado com sucesso!");
      } else {
        throw new Error(await res.text());
      }
    } catch(err) {
      setMessage("Não foi possível criar o relatório");
      console.log(err);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  } 

  return (
    <View>
      <Banner
        title="Relatar"
        imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
      />

      <Container>
        <Title>Criação de Relatório</Title>

        {message && <DefaultText>{message}</DefaultText>}

        <View style={styles.form}>
          <Dropdown<City>
            label="nome"
            value="id"
            data={cities}
            placeholder="Selecione uma cidade"
            defaultValue={report.cidadeId}
            onSelect={(city) => setReport(prev => ({...prev, cidadeId: city.id}))}
          />

          <Input
            label="Descrição"
            placeholder="Digite a descrição"
            autoCapitalize="none"
            onChangeText={(descricao) => setReport(prev => ({...prev, descricao}))}
          />

          <Button onPress={handleSubmit}>Criar Relatório</Button>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 8,
    gap: 8
  }
});