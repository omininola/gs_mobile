import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { API_URL_BASE } from '../libs/api';
import { City } from '../libs/types';

type CitiesContextType = {
    cities: City[];
    setCities: React.Dispatch<React.SetStateAction<City[]>>;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export function useCities() {
    const context = useContext(CitiesContext);
    if (!context)
        throw new Error('useCities deve ser usado com CitiesProvider');
    return context;
}

export function CitiesProvider({ children }: PropsWithChildren) {
    const [cities, setCities] = useState<City[]>([]);

    async function fetchCities() {
        try {
            const res = await fetch(`${API_URL_BASE}/cidades`);
            const data = await res.json();
            const citiesAsync = data.content;
            setCities(citiesAsync);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, setCities }}>
            {children}
        </CitiesContext.Provider>
    );
}
