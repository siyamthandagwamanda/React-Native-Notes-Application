import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../components/AuthContext';
import { CATEGORIES } from '../constants/notes';
import { getNotes } from '../services/storage';
import { form } from '../styles/form';

export default function Home() {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState<string[]>(CATEGORIES);


  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      getNotes(user.id).then((notes) => {
        const used = notes.map((note) => note.category);
        setCategories([...new Set([...CATEGORIES, ...used])]);
      });
    }, [user])
  );

  return (
    // ScrollView: no inputs here, but many categories may not fit on the screen
    <ScrollView contentContainerStyle={form.container}>
      <Text style={form.title}>Welcome, {user?.username}</Text>

      {categories.map((category) => (
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
    </ScrollView>
  );
}