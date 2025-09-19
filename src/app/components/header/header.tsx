"use client";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/headerImgs/Logo.svg";
import shoppingCartIcon from "../../../../public/assets/headerImgs/shopping-cart.svg";
import arrowDownIcon from "../../../../public/assets/headerImgs/arrowDown.svg";
import Image from "next/image";
import userIcon from "../../../../public/assets/headerImgs/user.svg";
import Link from "next/link";
import { getCookie } from "cookies-next";

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    setToken(getCookie("accessToken") as string | null);
    setAvatar(getCookie("avatar") as string | null);
  }, []);

  return (
    <div className="flex items-center justify-between px-[100px] py-[20px]">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>

      {token ? (
        <div className="flex items-center gap-[21.61px]">
          <Image src={shoppingCartIcon} alt="shopping Cart Icon" />
          <div className="flex items-center gap-[7px]">
            {avatar ? (
              <Image
                src={avatar}
                alt="user avatar"
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-[20px] bg-white flex  items-center justify-center shadow-gray-400 shadow-sm">
                <Image  src={userIcon} alt="userIcon"/>
              </div>
            )}
            <Image src={arrowDownIcon} alt="arrowDown Icon" />
          </div>
        </div>
      ) : (
        <Link
          href="/auth"
          className="flex items-center gap-[8px] cursor-pointer"
        >
          <Image src={userIcon} alt="userIcon" />
          <p className="text-[#10151F] text-[12px] font-poppins font-medium">
            Log in
          </p>
        </Link>
      )}
    </div>
  );
}
