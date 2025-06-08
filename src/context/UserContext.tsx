import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { User } from '../libs/types';

type UserContextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser deve ser usado com UserProvider');
    return context;
}

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);

    async function fetchUser() {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');

            if (storedToken) {
                setToken(storedToken);
            }

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}
