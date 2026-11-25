import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../components/AuthContext';
import FloatingButton from '../../components/FloatingButton';
import NoteCard from '../../components/NoteCard';
import { useNoteActions } from '../../hooks/useNoteActions';
import { getNotes } from '../../services/storage';
import { form } from '../../styles/form';
import { Note } from '../../types/types';
import { sortNotes } from '../../utils/sortNotes';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
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

  // Reload every time the screen comes into view.
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  const { confirmDelete, togglePin } = useNoteActions(loadNotes);

  // Search: every typed word must be in the title or text. Then pinned first, by date.
  const words = search.toLowerCase().split(' ').filter(Boolean);
  const matching = notes.filter((note) =>
    words.every((word) => `${note.title} ${note.text}`.toLowerCase().includes(word))
  );
  const visibleNotes = sortNotes(matching, newestFirst);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />

      <TextInput
        style={form.input}
        placeholder="Search notes"
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        spellCheck={false}
      />

      <Pressable onPress={() => setNewestFirst(!newestFirst)}>
        <Text style={styles.sort}>Sort: {newestFirst ? 'Newest first' : 'Oldest first'}</Text>
      </Pressable>

      <FlatList
        data={visibleNotes}
        keyExtractor={(note) => note.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push({ pathname: '/note', params: { id: item.id } })}
            onPin={() => togglePin(item)}
            onDelete={() => confirmDelete(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet. Tap + to add one.</Text>}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />

      {/* Opens a new note already set to this category */}
      <FloatingButton onPress={() => router.push({ pathname: '/note', params: { category: name } })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  sort: { color: '#2563EB', fontWeight: 'bold' },
  listContent: { paddingBottom: 100 },
  empty: { textAlign: 'center', color: '#888', marginTop: 24 },
});