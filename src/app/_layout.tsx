import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../components/AuthContext';


function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

      <Stack.Protected guard={!!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="category/[name]" options={{ headerShown: true }} />
        <Stack.Screen name="note" options={{ headerShown: true, title: 'Note' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}