import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import "../global.css";
import { getCurrentUser } from '@/backend/controllers/auth';

const RootLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colorScheme] = useState('white');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Handle the error gracefully without logging it
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("screens/admin/home_admin"); 
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return null; 
  }

  return (
    <ThemeProvider value={colorScheme === '' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens/auth/signin_page" options={{ headerShown: false }} />
        <Stack.Screen name="screens/auth/signup_page" options={{ headerShown: false }} />
        <Stack.Screen name="screens/admin/home_admin" options={{ headerShown: false }} />
        <Stack.Screen name="screens/admin/settings_admin" options={{ headerShown: false }} />
        <Stack.Screen name="screens/tabs/tab_screens/lessons_screen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default RootLayout;