import React from 'react';

type Props = {
  onSortChange: (type: "new" | "priceLow" | "priceHigh") => void;
};

export default function Sort({ onSortChange }: Props) {
  return (
    <div className='absolute flex flex-col border-[1px] border-[#E1DFE1] py-[16px] w-[223px] left-[-150px] top-[34.5px] rounded-[8px] z-10 bg-white gap-[8px]'>
      <h1 className='text-[#10151F] font-semibold font-poppins text-[16px] px-[16px]'>Sort by</h1>
      <div>
        <p
          onClick={() => onSortChange("new")}
          className='text-[#10151F] px-[16px] text-[16px] font-poppins font-normal h-[40px] flex items-center cursor-pointer'
        >
          New products first
        </p>
        <p
          onClick={() => onSortChange("priceLow")}
          className='text-[#10151F] px-[16px] text-[16px] font-poppins font-normal h-[40px] flex items-center cursor-pointer'
        >
          Price, low to high
        </p>
        <p
          onClick={() => onSortChange("priceHigh")}
          className='text-[#10151F] px-[16px] text-[16px] font-poppins font-normal h-[40px] flex items-center cursor-pointer'
        >
          Price, high to low
        </p>
      </div>
    </div>
  );
}
