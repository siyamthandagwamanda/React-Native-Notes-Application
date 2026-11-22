import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../components/AuthContext';
import { CATEGORIES } from '../types/types';
import { form } from '../styles/form';

export default function Home() {
  const { user, setUser } = useAuth();

  return (
    <View style={form.container}>
      <Text style={form.title}>Welcome, {user?.username}</Text>

      {/* One button per category, each opens its own page */}
      {CATEGORIES.map((category) => (
        <Pressable
          key={category}
          style={form.button}
          onPress={() => router.push({ pathname: '/category/[name]', params: { name: category } })}
        >
          <Text style={form.buttonText}>{category}</Text>
        </Pressable>
      ))}

      <Pressable onPress={() => setUser(null)}>
        <Text style={form.link}>Log out</Text>
      </Pressable>
    </View>
  );
}