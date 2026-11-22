import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../components/AuthContext';
import { addNote, editNote, getNotes } from '../services/storage';
import { CATEGORIES, Note } from '../types/types';
import { form } from '../styles/form';


export default function NoteScreen() {
  const { id, category } = useLocalSearchParams<{ id?: string; category?: string }>();
  const { user } = useAuth();
  const [existing, setExisting] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [noteCategory, setNoteCategory] = useState(category ?? CATEGORIES[0]);

  // When editing, fill the form with the saved note.
  useEffect(() => {
    if (!id || !user) return;
    getNotes(user.id).then((notes) => {
      const note = notes.find((n) => n.id === id);
      if (note) {
        setExisting(note);
        setTitle(note.title);
        setText(note.text);
        setNoteCategory(note.category);
      }
    });
  }, [id, user]);

  async function handleSave() {
    if (!user) return;
    if (!text.trim()) {
      Alert.alert('Please write a note');
      return;
    }
    if (existing) {
      await editNote({ ...existing, title, text, category: noteCategory });
    } else {
      await addNote({ userId: user.id, title, text, category: noteCategory });
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <TextInput style={form.input} placeholder="Title (optional)" value={title} onChangeText={setTitle} />
      <TextInput
        style={[form.input, styles.textArea]}
        placeholder="Write your note..."
        value={text}
        onChangeText={setText}
        multiline
      />

{/* Category picker: the selected one is filled blue */}

      <View style={styles.row}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={[styles.chip, noteCategory === c && styles.chipActive]}
            onPress={() => setNoteCategory(c)}
          >
            <Text style={noteCategory === c ? styles.chipTextActive : styles.chipText}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={form.button} onPress={handleSave}>
        <Text style={form.buttonText}>{existing ? 'Save changes' : 'Add note'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  textArea: { height: 160, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#2563EB', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  chipActive: { backgroundColor: '#2563EB' },
  chipText: { color: '#2563EB' },
  chipTextActive: { color: '#fff' },
});