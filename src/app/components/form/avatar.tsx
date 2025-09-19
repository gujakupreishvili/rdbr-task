"use client";
import React, { useRef } from "react";
import cameraIcon from "../../../../public/assets/authImgs/camera.svg";
import Image from "next/image";

type Props = {
  setFieldValue: (field: string, value: File | null) => void;
  value: File | null;
};

export default function Avatar({ setFieldValue, value }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 1024 * 1024) {
        alert("Image size must be less than 1MB");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFieldValue("avatar", file);
    }
  };

  const handleRemove = () => {
    setFieldValue("avatar", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div className="flex gap-[15px] items-center mb-[22px]">
      <div
        className="w-[100px] h-[100px] rounded-full border-[1px] border-[#E1DFE1] flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => !value && fileInputRef.current?.click()}
      >
        {value ? (
          <Image
            src={URL.createObjectURL(value)}
            alt="avatar preview"
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <Image src={cameraIcon} alt="cameraIcon" />
        )}
      </div>

      {value ? (
        <div className="flex items-center gap-[15px] ">
          <span
            className="cursor-pointer text-[14px] font-poppins text-[#3E424A] "
            onClick={() => fileInputRef.current?.click()}
          >
            Upload new
          </span>
          <span
            className="cursor-pointer text-[14px] font-poppins text-[#3E424A] "
            onClick={handleRemove}
          >
            Remove
          </span>
        </div>
      ) : (
        <p
          className="text-[14px] font-poppins font-normal text-[#3E424A] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload image
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
