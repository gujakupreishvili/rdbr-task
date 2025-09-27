import axios from "axios";
import { Product } from "../components/basketComponent/basketComponent";

export const getData = async (token: string) => {
  const res = await axios.get(
    "https://api.redseam.redberryinternship.ge/api/cart",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data as Product[];
};

export const deleteItem = async (
  token: string,
  productId: number,
  color: string,
  size: string
) => {
  await axios.delete(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}?color=${encodeURIComponent(
      color
    )}&size=${encodeURIComponent(size)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateQuantity = async (
  token: string,
  productId: number,
  color: string,
  size: string,
  newQuantity: number
) => {
  await axios.patch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
    { color, size, quantity: newQuantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
