import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import Chip from '../components/Chip';
import FormScreen from '../components/FormSceen';
import { CATEGORIES, fontFamily, NOTE_COLORS, NOTE_FONTS } from '../constants/notes';
import { addNote, editNote, getNotes } from '../services/storage';
import { form } from '../styles/form';
import { Note } from '../types/types';

const CATEGORY_CHIPS = [...CATEGORIES, 'Other'];

// A default category stays as its chip; any other name means "Other".
function chipFor(category?: string) {
  if (!category) return CATEGORIES[0];
  return CATEGORIES.includes(category) ? category : 'Other';
}

// Turns off the red squiggly lines and auto-changes while typing notes.
const plainTyping = { autoCorrect: false, spellCheck: false, autoComplete: 'off' } as const;

// With an id it edits that note; without one it adds a new note.
// An optional date (from the calendar) sets the day the note is for.
export default function NoteScreen() {
  const { id, category, date } = useLocalSearchParams<{ id?: string; category?: string; date?: string }>();
  const { user } = useAuth();
  const [existing, setExisting] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [chip, setChip] = useState(chipFor(category));
  const [otherName, setOtherName] = useState(category && !CATEGORIES.includes(category) ? category : '');
  const [font, setFont] = useState('Default');
  const [color, setColor] = useState(NOTE_COLORS[0]);
  const [pinned, setPinned] = useState(false);

  // When editing, fill the form with the saved note.
  useEffect(() => {
    if (!id || !user) return;
    getNotes(user.id).then((notes) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      setExisting(note);
      setTitle(note.title);
      setText(note.text);
      setChip(chipFor(note.category));
      if (!CATEGORIES.includes(note.category)) setOtherName(note.category);
      setFont(note.font ?? 'Default');
      setColor(note.color ?? NOTE_COLORS[0]);
      setPinned(note.pinned ?? false);
    });
  }, [id, user]);

  async function handleSave() {
    if (!user) return;
    if (!text.trim()) {
      Alert.alert('Please write a note');
      return;
    }

    let finalCategory = chip;
    if (chip === 'Other') {
      const typed = otherName.trim();
      if (!typed) {
        Alert.alert('Please type a category name');
        return;
      }
   
      finalCategory = CATEGORIES.find((c) => c.toLowerCase() === typed.toLowerCase()) ?? typed;
    }

    const details = { title, text, category: finalCategory, font, color, pinned };
    if (existing) {
      await editNote({ ...existing, ...details });
    } else {
      await addNote({ userId: user.id, ...details, date });
    }
    router.back();
  }

  const noteDate = existing?.date ?? date;
  const textFont = { fontFamily: fontFamily(font) };

  return (
    <FormScreen style={styles.container}>
      {noteDate ? <Text style={styles.label}>For {noteDate}</Text> : null}

      <TextInput
        style={[form.input, textFont]}
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
        {...plainTyping}
      />
      <TextInput
        style={[form.input, styles.textArea, textFont, { backgroundColor: color }]}
        placeholder="Write your note..."
        value={text}
        onChangeText={setText}
        multiline
        {...plainTyping}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {CATEGORY_CHIPS.map((c) => (
          <Chip key={c} label={c} selected={chip === c} onPress={() => setChip(c)} />
        ))}
      </View>
      {chip === 'Other' ? (
        <TextInput
          style={form.input}
          placeholder="Category name, e.g. Ideas"
          value={otherName}
          onChangeText={setOtherName}
          {...plainTyping}
        />
      ) : null}

      <Text style={styles.label}>Font</Text>
      <View style={styles.row}>
        {NOTE_FONTS.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={font === f}
            onPress={() => setFont(f)}
            textStyle={{ fontFamily: fontFamily(f) }}
          />
        ))}
      </View>

      <Text style={styles.label}>Highlight</Text>
      <View style={styles.row}>
        {NOTE_COLORS.map((c) => (
          <Pressable
            key={c}
            style={[styles.swatch, { backgroundColor: c }, color === c && styles.swatchSelected]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <View style={styles.pinRow}>
        <Text style={styles.label}>Pin to top</Text>
        <Switch value={pinned} onValueChange={setPinned} />
      </View>

      <Pressable style={form.button} onPress={handleSave}>
        <Text style={form.buttonText}>{existing ? 'Save changes' : 'Add note'}</Text>
      </Pressable>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  textArea: { height: 160, textAlignVertical: 'top' },
  label: { fontWeight: 'bold', color: '#333' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#ccc' },
  swatchSelected: { borderWidth: 3, borderColor: '#2563EB' },
  pinRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});