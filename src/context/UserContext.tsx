import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from "../libs/types"
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser deve ser usado com UserProvider");
  return context;
}

export function UserProvider({
  children
}: PropsWithChildren
) {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function fetchUser() {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}