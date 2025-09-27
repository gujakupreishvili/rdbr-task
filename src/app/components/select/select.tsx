import React from "react";
import arrowDown from "../../../../public/assets/headerImgs/arrowDown.svg"
import Image from "next/image";

type SelectProps = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function Select({ quantity, setQuantity }: SelectProps) {
  return (
    <div className="relative w-[70px]">
  <select
    className="w-full h-[42px] border border-[#E1DFE1] rounded-[8px]  pl-[15px] outline-none  appearance-none"
    value={quantity}
    onChange={(e) => setQuantity(Number(e.target.value))}
  >
    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
  <span className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none">
    <Image  src={arrowDown} alt="arrow"/>
  </span>
</div>

  );
}
