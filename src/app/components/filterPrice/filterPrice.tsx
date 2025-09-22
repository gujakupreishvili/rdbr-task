import Button from "../button/button";

type FilterPriceProps = {
  priceFrom: number;
  priceTo: number;
  setPriceFrom: (value: number) => void;
  setPriceTo: (value: number) => void;
  onApply: () => void;
};

export default function FilterPrice({
  priceFrom,
  priceTo,
  setPriceFrom,
  setPriceTo,
  onApply,
}: FilterPriceProps) {
  return (
    <div className="absolute border-[#E1DFE1] border-[1px] flex flex-col p-[16px] left-[-320px] rounded-[8px] w-[392px] top-[35px] z-10 bg-white gap-[20px] ">
      <p className="text-[#10151F] text-[16px] font-poppins font-semibold">
        Select price
      </p>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <input
            value={priceFrom || ""}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            type="number"
            placeholder="From"
            className="w-[50%] border-[#E1DFE1] border-[1px] outline-none rounded-[8px] px-[12px] py-[10.5px]"
          />
          <input
            value={priceTo || ""}
            onChange={(e) => setPriceTo(Number(e.target.value))}
            type="number"
            placeholder="To"
            className="w-[50%] border-[#E1DFE1] border-[1px] outline-none rounded-[8px] px-[12px] py-[10.5px]"
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <Button
            onClick={onApply}
            disabled={!priceFrom && !priceTo} 
            text="Apply"
            className="h-[41px] bg-[#FF4000] w-[124px] text-[14px] font-poppins font-normal text-white rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}
