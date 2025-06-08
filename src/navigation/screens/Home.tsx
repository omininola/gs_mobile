import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import { useUser } from '@/context/UserContext';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

export default function Home() {
    const { user, token } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        if (user && token) navigation.navigate('MainTabs');
    }, [user, token]);

    return (
        <View>
            <Banner
                title="Home"
                imageUri="https://img.freepik.com/fotos-gratis/pessoas-empilhando-as-maos-juntas-no-parque_53876-63293.jpg?semt=ais_hybrid&w=740"
            />

            <Container>
                <DefaultText>
                    Ajude a nossa comunidade a encontrar incêndios e queimadas,
                    relate esses acidentes e previna um estrago ainda maior pro
                    nosso planeta!
                </DefaultText>

                <View style={styles.cta}>
                    <Button screen="Login">Acesse sua conta</Button>
                    <DefaultText>ou</DefaultText>
                    <Button screen="Register">Crie uma agora mesmo</Button>
                    <DefaultText>Para ajudar a nossa comunidade!</DefaultText>
                </View>

                <DefaultText>
                    Veja também a situação dos nosso sensores espalhados pelas
                    zonas de risco pelo nosso Dashboard
                </DefaultText>
                <Button screen="Dashboard">Ir para o Dashboard</Button>
            </Container>

            <StatusBar barStyle="default" />
        </View>
    );
}

const styles = StyleSheet.create({
    cta: {
        alignItems: 'center',
        gap: 4,
        margin: 8,
    },
});
