import React from "react";
import Button from "../button/button";
// import { Product } from '../basketComponent/basketComponent';
type BasketSumProps = {
  subtotal: number;
  total: number;
  click?: () => void;
  text: string;
};

export default function BasketSum({
  subtotal,
  total,
  click,
  text,
}: BasketSumProps) {
  return (
    <div className="flex flex-col w-full items-center gap-[16px]">
      <div className="flex justify-between w-full">
        <p className="text-[#3E424A] text-[16px] font-poppins font-normal">
          Items subtotal
        </p>
        <p className="text-[#3E424A] font-poppins font-normal">${subtotal}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[#3E424A] text-[16px] font-poppins font-normal">
          Delivery
        </p>
        <p className="text-[#3E424A] font-poppins font-normal">$5</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[#10151F] text-[20px] font-poppins font-medium">
          Total
        </p>
        <p className="text-[#10151F] text-[20px] font-poppins font-medium">
          ${total}
        </p>
      </div>
      <Button
        onClick={click}
        text={text}
        className="rounded-[10px] mt-[86px] text-[18px] text-white font-poppins font-medium w-full h-[59px] bg-[#FF4000] hover:bg-[#E53900] transition-colors disabled:opacity-50"
      />
    </div>
  );
}
