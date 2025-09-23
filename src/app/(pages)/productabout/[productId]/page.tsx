"use client";
import Button from "@/app/components/button/button";
import Header from "@/app/components/header/header";
import SelectColor from "@/app/components/selectColor/selectColor";
import Size from "@/app/components/size/size";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import whiteBasketIcon from "../../../../../public/assets/contentImgs/whitebasketIcon.svg";
import Select from "@/app/components/select/select";

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

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const productId = Number(params.productId);

  const [data, setData] = useState<Product | null>(null);

  // states
  const [selectedColor, setSelectedColor] = useState<string | null>(
    searchParams.get("color") || null
  );
  const [selectSize, setSelectSize] = useState<string | null>(
    searchParams.get("size") || null
  );
  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getData = async (color: string, size: string, quantity: number) => {
    try {
      const res = await axios.get(
        `https://api.redseam.redberryinternship.ge/api/products/${productId}?color=${color}&size=${
          size || ""
        }&quantity=${quantity}`
      );
      const product: Product = res.data;
      setData(product);

      if (!selectedColor && product.available_colors.length > 0) {
        setSelectedColor(product.available_colors[0]);
      }
      if (!selectedImage && product.images.length > 0) {
        setSelectedImage(product.images[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const query = new URLSearchParams();
    if (selectedColor) query.set("color", selectedColor);
    if (selectSize) query.set("size", selectSize);
    query.set("quantity", String(quantity));
    router.replace(`?${query.toString()}`);
  

    getData(selectedColor || "", selectSize || "", quantity);
  }, [selectedColor, selectSize, quantity]);

  return (
    <>
      <Header />
      <p className=" mb-[49px] mt-[30px] px-[100px] text-[#10151F] text-[14px] font-poppins font-light">
        Listing / Product
      </p>
      {data && (
        <div className="flex px-[100px] gap-[168px] mb-[110px]">
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[9px]">
              {data.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={data.name}
                  width={121}
                  height={161}
                  onClick={() => {
                    setSelectedImage(img);
                    const colorIndex = data.images.indexOf(img);
                    if (
                      colorIndex !== -1 &&
                      data.available_colors[colorIndex]
                    ) {
                      setSelectedColor(data.available_colors[colorIndex]);
                    }
                  }}
                  className={`w-[121px] h-[161px] shadow-2xl shadow-gray-300 cursor-pointer rounded ${
                    selectedImage === img ? "border-2 border-black" : ""
                  }`}
                />
              ))}
            </div>
            <Image
              src={selectedImage || data.cover_image}
              alt={data?.name}
              width={703}
              height={937}
              className="w-[703px] h-[937px] shadow-2xl shadow-gray-300 rounded-[8px]"
            />
          </div>


          <div className="flex flex-col gap-[56px] w-[704px]">
            <div className="flex flex-col gap-[21px]">
              <h1 className="text-[#10151F] text-[32px] font-poppins font-semibold capitalize">
                {data.name}
              </h1>
              <p className="text-[#10151F] text-[32px] font-poppins font-semibold capitalize">
                ${data.price}
              </p>
            </div>


            <SelectColor
              data={data}
              selectedColor={selectedColor}
              setSelectedColor={(color) => {
                setSelectedColor(color);
                const index = data.available_colors.indexOf(color);
                if (index !== -1 && data.images[index]) {
                  setSelectedImage(data.images[index]);
                }
              }}
            />

            <Size
              data={data}
              selectSize={selectSize}
              setSelectSize={setSelectSize}
            />

            <div className="flex flex-col gap-[16px]">
              <p>Quantity</p>
              <Select quantity={quantity} setQuantity={setQuantity} />
            </div>

            <Button
              Img={whiteBasketIcon}
              text="Add to cart"
              className="w-full bg-[#FF4000] h-[59px] flex items-center justify-center gap-[10px] text-[18px] font-poppins text-white font-medium rounded-[10px]"
            />

            <div className="w-full h-[1px] bg-[#E1DFE1]"></div>

            <div className="flex flex-col gap-[7px]">
              <div className="h-[61px] flex items-center justify-between w-full">
                <h2 className="text-[20px] font-poppins font-medium text-[#10151F]">
                  Details
                </h2>
                <Image
                  src={data.brand.image}
                  alt="brand img"
                  width={100}
                  height={61}
                />
              </div>
              <div className="flex flex-col gap-[19px]">
                <p className="text-[#3E424A] text-[16px] font-poppins font-normal">
                  Brand: {data.brand.name}
                </p>
                <p className="text-[#3E424A] text-[16px] font-poppins font-normal">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
