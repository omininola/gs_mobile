import Banner from '@/components/Banner';
import Container from '@/components/Container';
import DefaultText from '@/components/DefaultText';
import { THING_SPEAK_API } from '@/libs/api';
import { chartColors, chartConfig } from '@/libs/chart';
import { ThingSpeakFeed } from '@/libs/types';
import { getFormatedTime } from '@/libs/utils';
import { Button } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Dashboard() {
    const [feeds, setFeeds] = useState<ThingSpeakFeed[]>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchThingSpeak() {
        setLoading(true);

        try {
            const res = await fetch(THING_SPEAK_API);
            const data = await res.json();
            setFeeds(data.feeds);
        } catch (err) {
            setMessage('Não foi possível se conectar com o ThingSpeak');
            console.log(err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    useEffect(() => {
        fetchThingSpeak();
    }, []);

    const chartData = {
        labels: feeds.map((feed) => getFormatedTime(feed.created_at)),
        datasets: [
            {
                data: feeds.map((feed) => parseFloat(feed.field1 || '0')),
                color: () => chartColors.temperature,
                strokeWidth: 2,
            },
            {
                data: feeds.map((feed) => parseFloat(feed.field2 || '0')),
                color: () => chartColors.humidity,
                strokeWidth: 2,
            },
            {
                data: feeds.map((feed) => parseFloat(feed.field3 || '0')),
                color: () => chartColors.airQuality,
                strokeWidth: 2,
            },
            {
                data: feeds.map((feed) => parseFloat(feed.field4 || '0')),
                color: () => chartColors.fireLevel,
                strokeWidth: 2,
            },
        ],
    };

    if (loading) {
        return (
            <View>
                <Banner
                    title="Dashboard"
                    imageUri="https://t4.ftcdn.net/jpg/04/94/94/33/360_F_494943379_C1DTG0LAHw2a0wmSeZDnd51dBLobHNR1.jpg"
                />

                <Container>
                    <Button screen="Home">Voltar para a Home</Button>

                    <DefaultText>Carregando...</DefaultText>
                </Container>
            </View>
        );
    }

    return (
        <ScrollView>
            <Banner
                title="Dashboard"
                imageUri="https://t4.ftcdn.net/jpg/04/94/94/33/360_F_494943379_C1DTG0LAHw2a0wmSeZDnd51dBLobHNR1.jpg"
            />

            <Container>
                <Button screen="Home">Voltar para a Home</Button>

                {message && <DefaultText>{message}</DefaultText>}

                {feeds.length > 0 && (
                    <View>
                        <Legend />

                        <LineChart
                            data={chartData}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>
                )}
            </Container>
        </ScrollView>
    );
}

function Legend() {
    return (
        <View style={styles.legendContainer}>
            <LegendField title="Temperatura" color={chartColors.temperature} />
            <LegendField title="Umidade" color={chartColors.humidity} />
            <LegendField
                title="Qualidade do Ar"
                color={chartColors.airQuality}
            />
            <LegendField title="Nível de Fogo" color={chartColors.fireLevel} />
        </View>
    );
}

function LegendField({ title, color }: { title: string; color: string }) {
    return (
        <View style={styles.legendField}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <DefaultText>{title}</DefaultText>
        </View>
    );
}

const styles = StyleSheet.create({
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 8,
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
    },

    legendField: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    legendDot: {
        width: 20,
        height: 20,
        marginRight: 4,
        borderRadius: 50,
    },
});
