import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../src/components/AuthContext';
import { form } from '../styles/form';

export default function Home() {
  const { user, setUser } = useAuth();

  return (
    <View style={form.container}>
      <Text style={form.title}>Welcome, {user?.username}</Text>
      <Pressable style={form.button} onPress={() => setUser(null)}>
        <Text style={form.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}