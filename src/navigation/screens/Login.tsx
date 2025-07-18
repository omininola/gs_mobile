import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import Input from '@/components/Input';
import { useUser } from '@/context/UserContext';
import { API_URL_BASE } from '@/libs/api';
import { TokenizedResponse, UserLogin } from '@/libs/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Login() {
    const { user, setUser, token, setToken } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        if (user && token) navigation.navigate('MainTabs');
    }, [user, token]);

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [userLogin, setUserLogin] = useState<UserLogin>({
        email: '',
        senha: '',
    });

    async function handleSubmit() {
        setLoading(true);

        try {
            const res = await fetch(`${API_URL_BASE}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),
            });

            if (res.ok) {
                setMessage(
                    'Login efetuado com sucesso, em breve você será redirecionado para a aba de relatórios!',
                );

                const data: TokenizedResponse = await res.json();

                await AsyncStorage.setItem(
                    'user',
                    JSON.stringify(data.usuario),
                );
                await AsyncStorage.setItem('token', JSON.stringify(data.token));

                setUser(data.usuario);
                setToken(data.token);

                navigation.navigate('MainTabs');
            } else {
                throw new Error(await res.json());
            }
        } catch (err) {
            setMessage('Não foi possível entrar com o usuário');
            console.log(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    return (
        <View>
            <Banner
                title="Login"
                imageUri="https://cfbio.gov.br/wp-content/uploads/2024/05/cfbio-2024-158-01-INTERNA-SITE.jpg"
            />

            <Container>
                {message && <DefaultText>{message}</DefaultText>}

                <Input
                    label="Email"
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    onChangeText={(email) =>
                        setUserLogin((prev) => ({ ...prev, email }))
                    }
                />

                <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    onChangeText={(senha) =>
                        setUserLogin((prev) => ({ ...prev, senha }))
                    }
                />

                <Button
                    disabled={loading}
                    style={loading && { opacity: 0.5 }}
                    color={loading ? 'gray' : 'green'}
                    onPress={loading ? undefined : handleSubmit}
                >
                    Entrar
                </Button>

                <View style={styles.belowActions}>
                    <Button screen="Home">Voltar para a página inicial</Button>

                    <View style={styles.ctaRegister}>
                        <DefaultText>Não tem uma conta?</DefaultText>
                        <Button screen="Register">Crie uma agora mesmo</Button>
                    </View>
                </View>
            </Container>
        </View>
    );
}

const styles = StyleSheet.create({
    belowActions: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    ctaRegister: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
});
