// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  perfil: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Replace with actual API call to verify token and fetch user
          setUser({ perfil: 'admin' }); // Mock user data; replace with real user fetch
        }
      } catch (err) {
        setError('Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    console.log('Logout realizado');
    await AsyncStorage.removeItem('authToken');
    router.push('/Login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}