import { Ionicons } from '@expo/vector-icons';
import TopTabs from 'expo-router/js-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = keyof typeof Ionicons.glyphMap;

// Draws a tab's icon: blue when that tab is open, grey otherwise.
function tabIcon(name: IconName) {
  return ({ focused }: { focused: boolean }) => (
    <Ionicons name={name} size={22} color={focused ? '#2563EB' : '#888'} />
  );
}

// The three main sections. Swipe left/right to move between them, like turning pages.
export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
      <TopTabs
        tabBarPosition="bottom"
        screenOptions={{
          tabBarShowIcon: true,
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#888',
          tabBarIndicatorStyle: { backgroundColor: '#2563EB', top: 0 },
          tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
        }}
      >
        <TopTabs.Screen name="index" options={{ title: 'Notes', tabBarIcon: tabIcon('document-text-outline') }} />
        <TopTabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: tabIcon('calendar-outline') }} />
        <TopTabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: tabIcon('person-outline') }} />
      </TopTabs>
    </SafeAreaView>
  );
}