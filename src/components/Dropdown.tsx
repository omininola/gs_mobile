import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export default function Dropdown<T>({
  label,
  value,
  data,
  placeholder,
  onSelect,
  defaultLabel,
  defaultValue,
}: {
  label: keyof T;
  value: keyof T;
  data: T[];
  placeholder?: string;
  onSelect?: (item: T, index: number) => void;
  defaultLabel?: string;
  defaultValue?: any;
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? "");

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          const selectedItem = data.find(
            (item: T) => item[value] === itemValue
          );
          if (selectedItem && onSelect) onSelect(selectedItem, itemIndex);
        }}
      >
        {placeholder && (
          <Picker.Item label={placeholder} value="" enabled={false} />
        )}

        {defaultLabel && (
          <Picker.Item
            key={defaultValue}
            label={defaultLabel}
            value={defaultValue}
          />
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
    borderColor: "#ccc",
    borderRadius: 50,
  },
});
