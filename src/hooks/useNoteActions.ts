import { Alert } from 'react-native';
import { deleteNote, pinNote } from '../services/storage';
import { Note } from '../types/types';

// Delete and pin actions shared by every list of notes.
// `reload` is called afterwards so the list shows the change.
export function useNoteActions(reload: () => void) {
  function confirmDelete(note: Note) {
    Alert.alert('Delete note?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(note.id);
          reload();
        },
      },
    ]);
  }

  async function togglePin(note: Note) {
    await pinNote(note.id, !note.pinned);
    reload();
  }

  return { confirmDelete, togglePin };
}