import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../constants/notes';
import { Note } from '../types/types';

type Props = {
  note: Note;
  onPress: () => void;
  onPin: () => void;
  onDelete: () => void;
};

// One note in a list: highlight colour, pin, title, text, dates and actions.
export default function NoteCard({ note, onPress, onPin, onDelete }: Props) {
  const font = { fontFamily: fontFamily(note.font) };

  return (
    <Pressable style={[styles.card, { backgroundColor: note.color ?? '#fff' }]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={[styles.title, font]} numberOfLines={1}>
          {note.title || note.category}
        </Text>
        {note.pinned ? <Ionicons name="pin" size={16} color="#2563EB" /> : null}
      </View>

      <Text style={[styles.text, font]} numberOfLines={3}>{note.text}</Text>

      {note.date ? <Text style={styles.date}>For {note.date}</Text> : null}
      <Text style={styles.date}>Added {new Date(note.createdAt).toLocaleString()}</Text>
      {note.updatedAt ? (
        <Text style={styles.date}>Edited {new Date(note.updatedAt).toLocaleString()}</Text>
      ) : null}

      <View style={styles.actions}>
        <Pressable onPress={onPin}>
          <Text style={styles.action}>{note.pinned ? 'Unpin' : 'Pin'}</Text>
        </Pressable>
        <Pressable onPress={onDelete}>
          <Text style={[styles.action, styles.delete]}>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginBottom: 12, gap: 4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flex: 1, fontSize: 17, fontWeight: 'bold' },
  text: { fontSize: 15, color: '#333' },
  date: { fontSize: 12, color: '#888' },
  actions: { flexDirection: 'row', gap: 20, marginTop: 6 },
  action: { color: '#2563EB', fontWeight: 'bold' },
  delete: { color: '#DC2626' },
});