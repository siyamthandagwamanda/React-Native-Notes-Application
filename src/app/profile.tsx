import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { updateUser } from '../services/storage';
import { form } from '../styles/form';

// Lets the logged-in user change their username, email and password.
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
      Alert.alert('Profile updated');
      router.back();
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }

  return (
    <View style={form.container}>
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
    </View>
  );
}