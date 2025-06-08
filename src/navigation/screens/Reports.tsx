import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import Dropdown from '@/components/Dropdown';
import ReportCard from '@/components/ReportCard';
import Title from '@/components/Title';
import { useCities } from '@/context/CitiesContext';
import { useUser } from '@/context/UserContext';
import { API_URL_BASE } from '@/libs/api';
import { City, Report } from '@/libs/types';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Reports() {
    const { user, setUser, token, setToken } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user || !token) navigation.navigate('Login');
    }, [user, token]);

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [cityFilter, setCityFilter] = useState<string>('');
    const [userFilter, setUserFilter] = useState<boolean>(false);

    const [message, setMessage] = useState<string>('');

    async function fetchReports() {
        setLoading(true);

        let filter = '';
        const filterCity = cityFilter != '' ? `cidade=${cityFilter}` : '';
        const filterUser = userFilter ? `usuarioId=${user?.id}` : '';
        filter = filter.concat('?', filterCity, filterUser);

        try {
            const res = await fetch(`${API_URL_BASE}/relatorios${filter}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 403 || res.status === 401) {
                setMessage(
                    'Você não tem permissão para ver relatórios, você será redirecionado para a tela de login',
                );

                setTimeout(() => {
                    setUser(undefined);
                    setToken(undefined);
                    navigation.navigate('Login');
                }, 3000);

                return;
            }

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

                    {message && <DefaultText>{message}</DefaultText>}

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

                {message && <DefaultText>{message}</DefaultText>}

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
    setCityFilter,
    userFilter,
    setUserFilter,
}: {
    cityFilter: string;
    setCityFilter: React.Dispatch<React.SetStateAction<string>>;
    userFilter: boolean;
    setUserFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { token, setUser, setToken } = useUser();
    const { cities, setCities } = useCities();
    const navigation = useNavigation();

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

    return (
        <View>
            <DefaultText>Filtros</DefaultText>

            <View style={styles.filterSection}>
                <Dropdown
                    label="nome"
                    value="id"
                    data={cities}
                    placeholder="Selecione uma cidade"
                    defaultItem={true}
                    onSelect={(city) => setCityFilter(city.nome)}
                />

                <Button onPress={() => setUserFilter((prev) => !prev)}>
                    {userFilter ? 'Todos relatórios' : 'Meus relatórios'}
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
