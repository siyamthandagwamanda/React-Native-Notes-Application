import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { login } from '../services/storage';
import { form } from '../styles/form';

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
    try {
      const user = await login(email.trim().toLowerCase(), password);
      setUser(user);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }

  return (
    <View style={form.container}>
      <Text style={form.title}>Log in</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={form.button} onPress={handleLogin}>
        <Text style={form.buttonText}>Log in</Text>
      </Pressable>
      <Link href="/register" style={form.link}>No account? Register</Link>
    </View>
  );
}