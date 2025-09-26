"use client";
import React, { useEffect, useState } from "react";
import removeIcon from "../../../../public/assets/contentImgs/remove.svg";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { MoonLoader } from "react-spinners";
import BasketItems from "../basketItems/basketItems";
import BasketSum from "../basketSum/basketSum";
import emtyBasketImg from "../../../../public/assets/contentImgs/Making Credit Purchase Online Securely.svg";
import Button from "../button/button";
import { deleteItem, getData, updateQuantity } from "@/app/service/service";
import { useRouter } from "next/navigation";

type BasketProps = {
  setCheckBasket: (value: boolean) => void;
};

type Brand = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  brand: Brand;
  color: string;
  size: string;
  price: number;
  quantity: number;
  total_price: number;
};

export default function BasketComponent({ setCheckBasket }: BasketProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getCookie("accessToken") as string;
  const router = useRouter()

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getData(token);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, color: string, size: string) => {
    try {
      setProducts((prev) =>
        prev.filter(
          (item) =>
            !(item.id === id && item.color === color && item.size === size)
        )
      );
      await deleteItem(token, id, color, size);
    } catch (err) {
      setError("Failed to remove item");
      fetchData();
    }
  };

  const handleUpdateQuantity = async (
    id: number,
    color: string,
    size: string,
    qty: number
  ) => {
    if (qty < 1) return;
    try {
      await updateQuantity(token, id, color, size, qty);
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity: qty }
            : item
        )
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  const gotoShooping = () => {
    router.push("/")
    setCheckBasket(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const subtotal = products.reduce(
    (acc, res) => acc + res.price * res.quantity,
    0
  );
  const total = subtotal + 5;

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#10151F]/30 z-50 flex justify-end">
        <div className="bg-white h-full w-[540px] flex items-center justify-center p-[40px]">
          <MoonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#10151F]/30 z-50 flex justify-end">
      <div className="bg-white h-full w-[540px] flex flex-col justify-between p-[40px]">
        <div>
          <div className="w-full flex items-center justify-between">
            <p>
              Shopping cart (<span>{products.length}</span>)
            </p>
            <Image
              src={removeIcon}
              alt="removeIcon"
              className="w-[32px] h-[32px] cursor-pointer"
              onClick={() => setCheckBasket(false)}
            />
          </div>

          <div
            className={`flex flex-col gap-[36px] ${
              products.length === 0 ? " h-auto" : " max-h-[300px]"
            } overflow-y-auto mt-[63px]`}
          >
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-[88px]">
                <Image src={emtyBasketImg} alt="basket" />
                <h2 className="text-[24px] text-[#10151F] font-poppins font-semibold mt-[37px] mb-[10px]">
                  Ooops!
                </h2>
                <p className="text-[14px] font-poppins font-normal text-[#3E424A] mb-[58px]">
                  You’ve got nothing in your cart just yet...
                </p>
                <Button
                onClick={gotoShooping}
                  text="Start shopping"
                  className="w-[214px] h-[41px] bg-[#FF4000] text-[#FFFFFF] text-[14px] font-poppins font-normal rounded-[10px]"
                />
              </div>
            ) : (
              products.map((product) => (
                <BasketItems
                  key={`${product.id}-${product.color}-${product.size}`}
                  product={product}
                  deleteItem={handleDelete}
                  updateQuantity={handleUpdateQuantity}
                />
              ))
            )}
          </div>
        </div>
        {products.length !== 0 && (
          <BasketSum total={total} subtotal={subtotal} />
        )}
      </div>
    </div>
  );
}
