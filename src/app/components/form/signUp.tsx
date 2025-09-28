"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../input/input";
import Image from "next/image";
import Button from "../button/button";
import eyeIcon from "../../../../public/assets/authImgs/eye.svg";
import { SignUpValidationSchema } from "@/app/utils/validation/signUpValidationSchema";
import Avatar from "./avatar";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type SignUpTypes = {
  avatar: null | File;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};

const signUpInitialValues: SignUpTypes = {
  avatar: null,
  email: "",
  password: "",
  password_confirmation: "",
  username: "",
};

type SignUpProps = {
  setCheckType: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUp({ setCheckType }: SignUpProps) {
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfrimPassword , setCheckConfrimPassword] = useState (false)

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | Record<string, string[]>>("");

  const onSubmit = async (values: SignUpTypes) => {
    try {
      setErrorMessage("");
      const formData = new FormData();
      if (values.avatar) formData.append("avatar", values.avatar);

      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("username", values.username);

      const res = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/register",
        formData
      );

      const { token, user } = res.data;
      setCookie("accessToken", token, { maxAge: 60 * 60 });

      if (user.avatar) setCookie("avatar", user.avatar, { maxAge: 60 * 60 });
      setCookie("email", user.email || values.email, { maxAge: 60 * 60 });

      router.push("/");
      console.log(res.data, "create success");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data, "error response");
        setErrorMessage(err.response?.data?.errors || err.response?.data?.message || "Registration failed");
      } else {
        console.log(err);
        setErrorMessage("Registration failed");
      }
    }
  };

  const renderErrors = () => {
    if (!errorMessage) return null;


    if (typeof errorMessage === "object" && !Array.isArray(errorMessage)) {
      return (
        <div className="flex flex-col gap-[4px] text-[#FF4000] font-poppins font-medium text-[14px]">
          {Object.values(errorMessage).flat().map((err: string, idx: number) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      );
    }
    return <p className="text-[#FF4000] text-[14px]">{errorMessage}</p>;
  };

  return (
    <div className="flex flex-col gap-[48px] max-w-[554px] w-full">
      <h1 className="text-[42px] font-poppins font-semibold text-[#10151F]">
        Registration
      </h1>
      <Formik
        initialValues={signUpInitialValues}
        enableReinitialize
        validationSchema={SignUpValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="flex flex-col gap-[24px]">
            <Avatar setFieldValue={setFieldValue} value={values.avatar} />

            <Input
              placeholder=""
              lableTxt="Username"
              type="text"
              name="username"
              error={errors.username}
              touched={touched.username}
            />

            <Input
              placeholder=""
              lableTxt="Email"
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
                classname="peer pr-[40px] border-[1px] outline-none pl-[12px] py-[10.5px] placeholder:text-[14px] w-full text-[#3E424A] text-[14px] font-poppins font-medium rounded-[8px]"
              />
              <Image
                src={eyeIcon}
                alt="eye icon"
                onClick={() => setCheckPassword(!checkPassword)}
                className="absolute right-[12px] top-[14px] cursor-pointer"
              />
            </div>

            <div className="relative">
              <Input
                placeholder=""
                lableTxt="Confirm Password"
                type={!checkConfrimPassword ? "password" : "text"}
                name="password_confirmation"
                error={errors.password_confirmation}
                touched={touched.password_confirmation}
                classname="peer pr-[40px] border-[1px] outline-none pl-[12px] py-[10.5px] placeholder:text-[14px] w-full text-[#3E424A] text-[14px] font-poppins font-medium rounded-[8px]"
              />
              <Image
                src={eyeIcon}
                alt="eye icon"
                onClick={() => setCheckConfrimPassword(!checkConfrimPassword)}
                className="absolute right-[12px] top-[14px] cursor-pointer"
              />
            </div>

            {renderErrors()}

            <Button
              text="Register"
              className="w-full rounded-[10px] bg-[#FF4000] py-[10px] text-[14px] text-white font-poppins font-normal mt-[22px]"
            />

            <p className="text-[14px] text-[#3E424A] font-poppins font-normal w-full text-center">
              Already member?
              <span
                onClick={() => setCheckType(false)}
                className="pl-[8px] text-[#FF4000] text-[14px] font-poppins font-medium cursor-pointer"
              >
                Log in
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
