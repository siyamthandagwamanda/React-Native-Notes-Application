import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import NoteIllustration from '../components/NoteIllustration';
import { form } from '../styles/form';

// The first screen logged-out users see.
export default function Welcome() {
  return (
    <View style={styles.container}>
      <NoteIllustration />
      <Text style={styles.title}>Your notes, organised</Text>
      <Text style={styles.subtitle}>Write, colour, pin and find your notes for work, study and life.</Text>

      <Pressable style={form.button} onPress={() => router.push('/register')}>
        <Text style={form.buttonText}>Get started</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/login')}>
        <Text style={form.link}>I already have an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 14, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 12 },
});