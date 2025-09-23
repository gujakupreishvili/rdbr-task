import { Product } from "@/app/(pages)/productabout/[productId]/page";
import React from "react";
import Button from "../button/button";

type SelectSizeProps = {
  data: Product;
  selectSize: string | null;
  setSelectSize: (size: string) => void;
};

export default function Size({
  data,
  selectSize,
  setSelectSize,
}: SelectSizeProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] font-poppins font-normal text-[#10151F]">
        Size: <span className="text-black">{selectSize || data?.size}</span>
      </p>
      <div className="flex gap-[13px] items-center">
        {data?.available_sizes && data.available_sizes.length > 0 ? (
          data.available_sizes.map((res, index) => (
            <Button
              key={index}
              text={res}
              onClick={() => setSelectSize(res)}
              className={`h-[42px] border-[1px] ${
                selectSize === res || (!selectSize && res === data.size)
                  ? "border-black"
                  : "border-[#E1DFE1]"
              } text-[16px] text-[#10151F] font-poppins font-normal w-[70px] flex items-center justify-center rounded-[10px]`}
            />
          ))
        ) : (
          <p>No sizes available</p>
        )}
      </div>
    </div>
  );
}
