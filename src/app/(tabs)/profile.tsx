import { useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';
import { useAuth } from '../../components/AuthContext';
import FormScreen from '../../components/FormSceen';
import { updateUser } from '../../services/storage';
import { form } from '../../styles/form';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  async function handleSave() {
    if (!user) return;
    if (!username || !email) {
      Alert.alert('Username and email are required');
      return;
    }
    try {
      const updated = await updateUser(
        { ...user, username: username.trim(), email: email.trim().toLowerCase() },
        password || undefined
      );
      setUser(updated);
      setPassword('');
      Alert.alert('Profile updated');
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }

  return (
    <FormScreen>
      <Text style={form.title}>Profile</Text>
      <TextInput style={form.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput
        style={form.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={form.input}
        placeholder="New password (leave empty to keep current)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={form.button} onPress={handleSave}>
        <Text style={form.buttonText}>Save</Text>
      </Pressable>
      <Pressable onPress={() => setUser(null)}>
        <Text style={form.link}>Log out</Text>
      </Pressable>
    </FormScreen>
  );
}