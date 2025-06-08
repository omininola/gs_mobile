import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContext";
import { API_URL_BASE } from "./api";
import { City, TokenizedResponse, UserLogin, UserRegister } from "./types";
import { useNavigation } from "@react-navigation/native";

export async function fetchCities(
  token: string,
  cbUnauthorized: () => void,
  cbOk: (cities: City[]) => void
) {
  try {
    const res = await fetch(`${API_URL_BASE}/cidades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar cidades");
    }

    if (res.status === 403 || res.status === 401) {
      cbUnauthorized();
      return;
    }

    const data = await res.json();
    const cities = data.content as City[];
    cbOk(cities);
  } catch (err) {
    console.log(err);
  }
}
