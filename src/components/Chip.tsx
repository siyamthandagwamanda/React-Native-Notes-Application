import { Pressable, StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
};


export default function Chip({ label, selected, onPress, textStyle }: Props) {
  return (
    <Pressable style={[styles.chip, selected && styles.selected]} onPress={onPress}>
      <Text style={[styles.text, selected && styles.selectedText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { borderWidth: 1, borderColor: '#2563EB', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  selected: { backgroundColor: '#2563EB' },
  text: { color: '#2563EB' },
  selectedText: { color: '#fff' },
});