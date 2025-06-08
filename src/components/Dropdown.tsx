import { City } from '@/libs/types';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Dropdown({
    label,
    value,
    data,
    placeholder,
    defaultItem,
    onSelect,
}: {
    label: keyof City;
    value: keyof City;
    data: City[];
    placeholder?: string;
    defaultItem?: boolean;
    onSelect?: (item: City, index: number) => void;
}) {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    const selectedItem = data.find(
                        (item: City) => item[value] === itemValue,
                    );
                    if (!selectedItem && onSelect && defaultItem) {
                        const defaultItem: City = {
                            id: 0,
                            nome: '',
                        };

                        onSelect(defaultItem, -1);
                    }
                    if (selectedItem && onSelect)
                        onSelect(selectedItem, itemIndex);
                }}
            >
                {placeholder && (
                    <Picker.Item
                        label={placeholder}
                        value={''}
                        enabled={false}
                    />
                )}

                {defaultItem && (
                    <Picker.Item label={'Todas as cidades'} value={''} />
                )}

                {data.map((item, idx) => (
                    <Picker.Item
                        key={idx}
                        label={item[label] as string}
                        value={item[value]}
                    />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 50,
    },
});
