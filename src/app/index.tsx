import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { form } from '../styles/form';
import { CATEGORIES } from '../types/types';

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

      <Pressable onPress={() => router.push('/profile')}>
        <Text style={form.link}>Profile</Text>
      </Pressable>

      <Pressable onPress={() => setUser(null)}>
        <Text style={form.link}>Log out</Text>
      </Pressable>

    </View>
  );
}