import { Pressable, StyleSheet, Text } from 'react-native';
import { Note } from '../types/types';

type Props = {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
};

// One note in the list: title, text, dates and a delete button.
export default function NoteCard({ note, onPress, onDelete }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {note.title ? <Text style={styles.title}>{note.title}</Text> : null}
      <Text style={styles.text} numberOfLines={3}>{note.text}</Text>
      <Text style={styles.date}>Added {new Date(note.createdAt).toLocaleString()}</Text>
      {note.updatedAt ? (
        <Text style={styles.date}>Edited {new Date(note.updatedAt).toLocaleString()}</Text>
      ) : null}
      <Pressable onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginBottom: 12, gap: 4 },
  title: { fontSize: 17, fontWeight: 'bold' },
  text: { fontSize: 15, color: '#333' },
  date: { fontSize: 12, color: '#888' },
  delete: { color: '#DC2626', fontWeight: 'bold', marginTop: 6 },
});