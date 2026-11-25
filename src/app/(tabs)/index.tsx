import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../../components/AuthContext';
import CategoryDropdown from '../../components/CategoryDropdown';
import FloatingButton from '../../components/FloatingButton';
import NoteCard from '../../components/NoteCard';
import { CATEGORIES } from '../../constants/notes';
import { useNoteActions } from '../../hooks/useNoteActions';
import { getNotes } from '../../services/storage';
import { Note } from '../../types/types';
import { sortNotes } from '../../utils/sortNotes';

const RECENT_COUNT = 10;

// Home: pick a category from the dropdown, open a recent note, or tap + to add one.
export default function Home() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(async () => {
    if (!user) return;
    setNotes(await getNotes(user.id));
  }, [user]);

  // Reload each time Home comes back into view.
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  const { confirmDelete, togglePin } = useNoteActions(loadNotes);

  // Default categories plus any custom ones used in notes, without duplicates.
  const categories = [...new Set([...CATEGORIES, ...notes.map((note) => note.category)])];
  const recentNotes = sortNotes(notes).slice(0, RECENT_COUNT);

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.content}
        data={recentNotes}
        keyExtractor={(note) => note.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Hi, {user?.username}</Text>
            <CategoryDropdown
              categories={categories}
              onSelect={(name) => router.push({ pathname: '/category/[name]', params: { name } })}
            />
            <Text style={styles.section}>Recent notes</Text>
          </View>
        }
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push({ pathname: '/note', params: { id: item.id } })}
            onPin={() => togglePin(item)}
            onDelete={() => confirmDelete(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet. Tap + to add one.</Text>}
      />

      <FloatingButton onPress={() => router.push('/note')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 100 }, 
  header: { gap: 14, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: 'bold' },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  empty: { textAlign: 'center', color: '#888', marginTop: 24 },
});