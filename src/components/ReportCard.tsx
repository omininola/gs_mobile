import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Report } from '../libs/types';
import { getFormatedDate, getFormatedTime } from '../libs/utils';
import DefaultText from './DefaultText';

export default function ReportCard({ report }: { report: Report }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardSection}>
                <View style={styles.cardField}>
                    <Icon name="address-card" size={24} />
                    {report.emailUsuario && (
                        <DefaultText>{report.emailUsuario}</DefaultText>
                    )}
                    {report.modeloDrone && (
                        <DefaultText>{report.modeloDrone}</DefaultText>
                    )}
                </View>

                <View style={styles.cardField}>
                    <Icon name="map-pin" size={24} color="#ff383f" />
                    <DefaultText>{report.cidade}</DefaultText>
                </View>
            </View>

            <View style={styles.cardSection}>
                <View style={styles.cardField}>
                    <Icon name="calendar-day" size={24} />
                    <DefaultText>{getFormatedDate(report.data)}</DefaultText>
                </View>

                <View style={styles.cardField}>
                    <Icon name="clock" size={24} />
                    <DefaultText>{getFormatedTime(report.data)}</DefaultText>
                </View>
            </View>

            <View style={styles.cardBottom}>
                <DefaultText>Relatório: {report.descricao}</DefaultText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 12,
        padding: 12,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#ccc',
    },

    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    cardField: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },

    cardBottom: {
        marginTop: 12,
    },
});
