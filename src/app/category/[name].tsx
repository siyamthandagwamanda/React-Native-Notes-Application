import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../components/AuthContext';
import NoteCard from '../../components/NoteCard';
import { deleteNote, getNotes } from '../../services/storage';
import { form } from '../../styles/form';
import { Note } from '../../types/types';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>(); // e.g. "Work" from the URL
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);

  // Load this user's notes for this category.
  const loadNotes = useCallback(async () => {
    if (!user) return;
    const all = await getNotes(user.id);
    setNotes(all.filter((note) => note.category === name));
  }, [user, name]);

  // Reload every time the screen comes into view (e.g. after adding a note).
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  function confirmDelete(id: string) {
    Alert.alert('Delete note?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(id);
          loadNotes();
        },
      },
    ]);
  }

  // Search: a note matches only if every typed word is in its title or text.
  const words = search.toLowerCase().split(' ').filter(Boolean);
  const visibleNotes = notes
    .filter((note) => words.every((word) => `${note.title} ${note.text}`.toLowerCase().includes(word)))
    // Sort by date added.
    .sort((a, b) =>
      newestFirst ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
    );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />

      <TextInput style={form.input} placeholder="Search notes" value={search} onChangeText={setSearch} />

      <View style={styles.row}>
        <Pressable onPress={() => setNewestFirst(!newestFirst)}>
          <Text style={form.link}>Sort: {newestFirst ? 'Newest first' : 'Oldest first'}</Text>
        </Pressable>
        <Pressable onPress={() => router.push({ pathname: '/note', params: { category: name } })}>
          <Text style={form.link}>+ Add note</Text>
        </Pressable>
      </View>

      <FlatList
        data={visibleNotes}
        keyExtractor={(note) => note.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push({ pathname: '/note', params: { id: item.id } })}
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  empty: { textAlign: 'center', color: '#888', marginTop: 24 },
});