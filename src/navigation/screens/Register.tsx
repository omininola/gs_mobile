import { StyleSheet, View } from "react-native";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Input from "../../components/Input";
import { Button } from "@react-navigation/elements";
import DefaultText from "../../components/DefaultText";
import { useEffect, useState } from "react";
import { User, UserRegister } from "../../libs/types";
import { API_URL_BASE } from "../../libs/api";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Register() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) navigation.navigate("MainTabs");
  }, [user])

  const [message, setMessage] = useState<string>("");
  const [userForm, setUserForm] = useState<UserRegister>({
    nome: "",
    email: "",
    senha: "",
  });

  async function handleSubmit() {
    try {
      const res = await fetch(
        `${API_URL_BASE}/usuarios`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userForm)
        }
      );
  
      if (res.ok) {
        setMessage("Cadastro efetuado com sucesso, em breve você será redirecionado para a aba de relatórios!");
        
        const data: User = await res.json();
        await AsyncStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        
        navigation.navigate("MainTabs");
      } else {
        throw new Error(await res.text());
      }
    } catch(err) {
      setMessage("Não foi possível criar o usuário");
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
        title="Cadastre-se"
        imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
      />

      <Container>
        {message && <DefaultText>{message}</DefaultText>}

        <Input
          label="Nome"
          value={userForm.nome}
          placeholder="Digite seu nome"
          autoCapitalize="words"
          autoComplete="name"
          onChangeText={(nome) => setUserForm(prev => ({...prev, nome}))}
        />

        <Input
          label="Email"
          value={userForm.email}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          onChangeText={(email) => setUserForm(prev => ({...prev, email}))}
        />

        <Input
          label="Senha"
          value={userForm.senha}
          placeholder="Digite sua senha"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={(senha) => setUserForm(prev => ({...prev, senha}))}
        />

        <Button color="green" onPress={handleSubmit}>Cadastrar</Button>

        <View style={styles.belowActions}>
          <Button screen="Home">Voltar para a página inicial</Button>

          <View style={styles.ctaLogin}>
            <DefaultText>Já tem uma conta?</DefaultText>
            <Button screen="Login">Acesse ela por aqui!</Button>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  belowActions: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  ctaLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  }
});