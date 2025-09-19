"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../input/input";
import { SignInValidationSchema } from "@/app/utils/validation/signInValidationSchema";
import eyeIcon from "../../../../public/assets/authImgs/eye.svg";
import Image from "next/image";
import Button from "../button/button";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
type SignIntypes = {
  email: string;
  password: string;
};
const SignInInitialValues = {
  email: "",
  password: "",
};
type SignInProps = {
  setCheckType: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignIn({ setCheckType }: SignInProps) {
  const [checkPassword, setCheckPassword] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: SignIntypes) => {
    try {
      const res = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/login",
        values
      );
      const accessToken = res.data.token;
      setCookie("accessToken", accessToken, { maxAge: 60 * 60 });
      router.push("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-[48px] max-w-[554px] w-full">
      <h1 className="text-[42px] font-poppins font-semibold text-[#10151F]">
        Log in
      </h1>
      <Formik
        initialValues={SignInInitialValues}
        enableReinitialize
        validationSchema={SignInValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-[24px]">
            <Input
            placeholder=""
              lableTxt="Email "
              type="email"
              name="email"
              error={errors.email}
              touched={touched.email}
            />
            <div className="relative">
              <Input
              placeholder=""
                lableTxt="Password"
                type={!checkPassword ? "password" : "text"}
                name="password"
                error={errors.password}
                touched={touched.password}
                classname="peer pr-[40px] border-[1px] outline-none pl-[12px] py-[10.5px] placeholder:text-[14px] w-full placeholder:text-[#3E424A] text-[#3E424A] text-[14px] font-poppins font-medium placeholder:font-poppins placeholder:font-normal rounded-[8px]"
              />
              <Image
                src={eyeIcon}
                alt="eye icon"
                onClick={() => setCheckPassword(!checkPassword)}
                className="absolute right-[12px] top-[14px] cursor-pointer "
              />
            </div>
            <Button
              text="Log in"
              className="w-full rounded-[10px] bg-[#FF4000] py-[10px] text-[14px] text-white font-poppins font-normal mt-[22px]"
            />
            <p className=" text-[14px] text-[#3E424A] font-poppins  font-normal w-full text-center">
              {" "}
              Not a member?
              <span
                onClick={() => setCheckType(true)}
                className="pl-[8px] text-[#FF4000] text-[14px] font-poppins font-medium cursor-pointer"
              >
                Register
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
