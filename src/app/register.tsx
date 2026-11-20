import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { register } from '../services/storage';
import { form } from '../styles/form';

export default function Register() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!username || !email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
    try {
      const user = await register(username.trim(), email.trim().toLowerCase(), password);
      setUser(user); 
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }

  return (
    <View style={form.container}>
      <Text style={form.title}>Create account</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={form.button} onPress={handleRegister}>
        <Text style={form.buttonText}>Register</Text>
      </Pressable>
      <Link href="/login" style={form.link}>Already have an account? Log in</Link>
    </View>
  );
}