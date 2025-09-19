import { Field, ErrorMessage } from "formik";
import React from "react";
import TextError from "../form/textError";

type Props = {
  lableTxt?: string;
  classname?: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
};

export default function Input({
  name,
  type,
  placeholder,
  lableTxt,
  error,
  touched,
  classname = "",
}: Props) {
  const borderClass = error && touched ? "border-[#FF4000]" : "border-gray-300";
  const labelClass = error && touched ? "text-[#FF4000]" : "text-gray-500";

  return (
    <div className="flex flex-col gap-[4px] lg:text-[18px] relative">
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${
          classname ||
          ` peer  border-[1px] outline-none px-[12px] text-[14px] text-[#3E424A] font-poppins font-medium py-[10.5px] w-full rounded-[8px] placeholder:text-[#3E424A] placeholder:font-poppins placeholder:font-normal`
        } ${borderClass}`}
      />
      <label
        htmlFor={name}
        className={`absolute 
      left-[12px] 
      top-[10px]
      bg-white
      transition-all 
      duration-300 
      pointer-events-none
      peer-focus:top-[-12px] 
      peer-not-placeholder-shown:top-[-12px]
      text-[#3E424A]
      font-poppins
      font-normal
      ${labelClass}`}
      >
        {lableTxt} <span className="text-red-500"> *</span>
      </label>
      <ErrorMessage name={name}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  );
}
