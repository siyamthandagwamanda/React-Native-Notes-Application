import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../components/AuthContext';

// Decides which screens can be opened, based on whether someone is logged in.
function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
{/* Only reachable when logged out. Welcome is listed first, so it opens first. */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

{/* Only reachable when logged in */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="category/[name]" options={{ headerShown: true }} />
        <Stack.Screen name="note" options={{ headerShown: true, title: 'Note' }} />
      </Stack.Protected>
    </Stack>
  );
}

// RootNavigator sits inside AuthProvider so it can call useAuth().
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}