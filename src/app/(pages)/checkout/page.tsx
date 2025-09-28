"use client";
import BasketItem from "@/app/components/basketItems/basketItems";
import BasketSum from "@/app/components/basketSum/basketSum";
import Header from "@/app/components/header/header";
import Input from "@/app/components/input/input";
import { deleteItem, getData, updateQuantity } from "@/app/service/service";
import { CheckoutValidationSchema } from "@/app/utils/validation/checkoutValidationSchemta";
import { getCookie, setCookie } from "cookies-next";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Product } from "../productabout/[productId]/page";
import axios from "axios";
import emailIcon from "../../../../public/assets/contentImgs/emailIcon.svg";
import Image from "next/image";
import checkPoint from "../../../../public/assets/contentImgs/checkpoint.svg";
import Button from "@/app/components/button/button";
import removeIcon from "../../../../public/assets/contentImgs/remove.svg";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

type Checkouttypes = {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
};

export default function Checkout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailFromCookie, setEmailFromCookie] = useState("");
  const router = useRouter();
  const token = getCookie("accessToken") as string;
  const [congrats, setCongrats] = useState(false);

  useEffect(() => {
    const email = getCookie("email");
    if (typeof email === "string") {
      setEmailFromCookie(email);
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getData(token);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      console.log(err);
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

  const checkout = async (auth: Checkouttypes) => {
    try {
      const res = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/cart/checkout",
        auth,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Checkout response:", res.data);
      setCongrats(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Checkout failed:", error.response?.data);
        console.error("Status:", error.response?.status);
      } else {
        console.error(error);
      }
    }
  };

  const subtotal = products.reduce(
    (acc, res) => acc + res.price * res.quantity,
    0
  );
  const total = subtotal + 5;

  const gotoShopping = () => {
    router.push("/");
    setTimeout(() => {
      setCongrats(true);
    }, 2000);
  };

  const CheckoutInitialValues: Checkouttypes = {
    name: "",
    surname: "",
    email: emailFromCookie || "",
    address: "",
    zip_code: "",
  };

  return (
    <>
      {congrats ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-screen bg-black/20 backdrop-blur-sm">
          <div className="relative flex flex-col w-[876px] h-[590px] justify-center items-center bg-white rounded-[12px]">
            <Image
              onClick={gotoShopping}
              src={removeIcon}
              alt="remove"
              className="absolute right-[30px] top-[50px] w-[45px] h-[45px] cursor-pointer"
            />
            <Image src={checkPoint} alt="" className="w-[76px] h-[76px]" />
            <h1 className="text-[42px] font-poppins font-semibold text-[#10151F] pt-[40px] pb-[16px]">
              Congrats!
            </h1>
            <p className="text-[14px] text-[#3E424A] font-poppins font-normal pb-[74px]">
              Your order is placed successfully!
            </p>
            <Button
              onClick={gotoShopping}
              text="Continue shopping"
              className="w-[214px] h-[41px] bg-[#FF4000] rounded-[10px] text-[14px] text-white font-poppins font-normal"
            />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="flex flex-col w-full mt-[72px] px-[100px]">
            {loading ? (
              <div className="flex items-center justify-center w-full h-screen">
                <MoonLoader />
              </div>
            ) : (
              <>
                <h1 className="text-[42px] pb-[42px] font-poppins font-semibold text-[#10151F]">
                  Checkout
                </h1>

                <Formik
                  initialValues={CheckoutInitialValues}
                  enableReinitialize
                  validationSchema={CheckoutValidationSchema}
                  onSubmit={(values) => {
                    // ინახავთ email cookie-ში
                    setCookie("email", values.email, { maxAge: 60 * 60 });
                    checkout(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="w-full flex items-start gap-[131px] mb-[188px]">
                      <div className="flex flex-col bg-[#F8F6F7] w-[1129px] px-[47px] pt-[72px] rounded-[18px] h-[626px]">
                        <p className="pb-[46px]">Order details</p>
                        <div className="w-[578px] flex flex-col gap-[33px]">
                          <div className="flex items-center w-full gap-[24px]">
                            <div className="h-[42px]">
                            <Input
                              placeholder="Name"
                              name="name"
                              type="string"
                              classname="w-[277px] h-[42px] px-[12px] border-[1px] rounded-[8px] bg-white placeholder:text-[#3E424A] placeholder:text-[14px] placeholder:font-poppins placeholder:font-normal text-[14px] font-poppins font-normal outline-none"
                              error={errors.name}
                              touched={touched.name}
                            />
                            </div>
                            <div className="h-[42px]">
                            <Input
                              placeholder="Surname"
                              name="surname"
                              type="string"
                              classname="w-[277px] h-[42px] px-[12px] border-[1px] rounded-[8px] bg-white placeholder:text-[#3E424A] placeholder:text-[14px] placeholder:font-poppins placeholder:font-normal text-[14px] font-poppins font-normal outline-none"
                              error={errors.surname}
                              touched={touched.surname}
                            />
                            </div>
                          </div>

                          <div className="h-[42px] relative">
                            <div className="h-[42px]">
                            <Input
                              placeholder="Email"
                              name="email"
                              type="email"
                              classname="bg-white border-[1px] border-[#E1DFE1] h-[42px] rounded-[8px] pl-[36px] outline-none placeholder:text-[#3E424A] placeholder:text-[14px] placeholder:font-poppins placeholder:font-normal text-[14px] font-poppins font-normal"
                              error={errors.email}
                              touched={touched.email}
                            />
                            <Image
                              src={emailIcon}
                              alt="emailIcon"
                              className="absolute top-[12px] left-[11px]"
                            />
                            </div>
                          </div>

                          <div className="flex items-center w-full gap-[24px]">
                            <div className="h-[42px]">
                            <Input
                              placeholder="Address"
                              name="address"
                              type="string"
                              classname="w-[277px] h-[42px] px-[12px] border-[1px] rounded-[8px] bg-white placeholder:text-[#3E424A] placeholder:text-[14px] placeholder:font-poppins placeholder:font-normal text-[14px] font-poppins font-normal outline-none"
                              error={errors.address}
                              touched={touched.address}
                            />
                            </div>
                            <div className="h-[42px]">
                            <Input
                              placeholder="Zip Code"
                              name="zip_code"
                              type="string"
                              classname="w-[277px] h-[42px] px-[12px] border-[1px] rounded-[8px] bg-white placeholder:text-[#3E424A] placeholder:text-[14px] placeholder:font-poppins placeholder:font-normal text-[14px] font-poppins font-normal outline-none"
                              error={errors.zip_code}
                              touched={touched.zip_code}
                            />
                            </div>
                          </div>
                        </div>
                      </div>

                      {products.length > 0 ? (
                        <div className="flex flex-col justify-between w-[460px] h-[626px]">
                          <div className="gap-[36px] flex flex-col max-h-[310px] overflow-y-auto">
                            {products.map((product) => (
                              <BasketItem
                                key={`${product.id}-${product.color}-${product.size}`}
                                product={product}
                                deleteItem={handleDelete}
                                updateQuantity={handleUpdateQuantity}
                              />
                            ))}
                          </div>
                          <BasketSum
                            total={total}
                            subtotal={subtotal}
                            text="Pay"
                            className="rounded-[10px] mt-[60px] text-[18px] text-white font-poppins font-medium w-full h-[59px] bg-[#FF4000] hover:bg-[#E53900] transition-colors disabled:opacity-50" 
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-[20px] w-[460px] h-[626px]">
                          <h1 className="text-[32px] font-poppins font-bold">
                            Ooops!
                          </h1>
                          <p className="text-[22px] font-poppins font-medium text-gray-500">
                            Cart is empty
                          </p>
                          <Button
                            onClick={gotoShopping}
                            text="Start shopping"
                            className="w-[200px] h-[40px] bg-[#FF4000] text-white text-[15px] font-poppins font-medium rounded-[12px]"
                          />
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
