import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Title from '@/components/Title';
import { useCities } from '@/context/CitiesContext';
import { useUser } from '@/context/UserContext';
import { API_URL_BASE } from '@/libs/api';
import { City, ReportCreate } from '@/libs/types';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ReportCreateScreen() {
    const { user, setUser, token, setToken } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user || !token) navigation.navigate('Login');
    }, [user, token]);

    const { cities, setCities } = useCities();
    const [report, setReport] = useState<ReportCreate>({
        cidadeId: 0,
        usuarioId: user?.id || 0,
        descricao: '',
    });

    async function fetchCities() {
        try {
            const res = await fetch(`${API_URL_BASE}/cidades`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Erro ao buscar cidades');
            }

            if (res.status === 403 || res.status === 401) {
                setUser(undefined);
                setToken(undefined);
                navigation.navigate('Login');
                return;
            }

            const data = await res.json();
            const cities = data.content as City[];
            setCities(cities);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCities();
    }, []);

    const [message, setMessage] = useState<string>('');
    async function handleSubmit() {
        try {
            const res = await fetch(`${API_URL_BASE}/relatorios/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(report),
            });

            if (res.status === 403 || res.status === 401) {
                setMessage(
                    'Você não tem permissão para criar relatórios, você será redirecionado para a tela de login',
                );

                setTimeout(() => {
                    setUser(undefined);
                    setToken(undefined);
                    navigation.navigate('Login');
                }, 3000);

                return;
            }

            if (res.ok) {
                setMessage('Relatório criado com sucesso!');
            } else {
                throw new Error(await res.text());
            }
        } catch (err) {
            setMessage('Não foi possível criar o relatório');
            console.log(err);
        } finally {
            setTimeout(() => {
                setMessage('');
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
                    <Dropdown
                        label="nome"
                        value="id"
                        data={cities}
                        placeholder="Selecione uma cidade"
                        onSelect={(city) =>
                            setReport((prev) => ({
                                ...prev,
                                cidadeId: city.id,
                            }))
                        }
                    />

                    <Input
                        label="Descrição"
                        placeholder="Digite a descrição"
                        autoCapitalize="none"
                        onChangeText={(descricao) =>
                            setReport((prev) => ({ ...prev, descricao }))
                        }
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
        gap: 8,
    },
});
