import api from "./api";
import { getToken } from "./authService";

export const addToFavorites = async (mealId: string) => {
  const token = getToken();
  const response = await api.post(
    "/favorites",
    { mealId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getFavorites = async () => {
  const token = getToken();
  const response = await api.get("/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const removeFavorite = async (mealId: string) => {
  const token = getToken();
  const response = await api.delete(`/favorites/${mealId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
