import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  categories: string[];
  onSelect: (category: string) => void;
};

// A button that opens a scrollable list of categories.

export default function CategoryDropdown({ categories, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  function choose(category: string) {
    setOpen(false);
    onSelect(category);
  }

  return (
    <View>
      <Pressable style={styles.header} onPress={() => setOpen(!open)}>
        <Text style={styles.headerText}>Categories</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#2563EB" />
      </Pressable>

      {open ? (
// maxHeight keeps the list short; nestedScrollEnabled lets it scroll inside the page's list.
        <ScrollView style={styles.list} nestedScrollEnabled>
          {categories.map((category) => (
            <Pressable key={category} style={styles.item} onPress={() => choose(category)}>
              <Text style={styles.itemText}>{category}</Text>
              <Ionicons name="chevron-forward" size={16} color="#999" />
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 8,
    padding: 14,
  },
  headerText: { color: '#2563EB', fontWeight: 'bold', fontSize: 16 },
  list: { maxHeight: 220, borderWidth: 1, borderTopWidth: 0, borderColor: '#ddd', borderRadius: 8 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16 },
});