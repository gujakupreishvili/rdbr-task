import { Product } from "@/app/(pages)/productabout/[productId]/page";

type SelectColorProps = {
  data: Product;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
};

export default function SelectColor({
  data,
  selectedColor,
  setSelectedColor,
}: SelectColorProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] font-poppins font-normal text-[#10151F]">
        Color: <span className="text-black">{selectedColor || data.color}</span>
      </p>
      <div className="flex gap-[13px] items-center">
        {data.available_colors.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(item)}
            style={{
              backgroundColor: item,
              boxShadow:
                selectedColor === item
                  ? "0 0 0 5px white, 0 0 0 6px #E1DFE1"
                  : "0 0 0 1px #E1DFE1",
            }}
            className="w-[38px] h-[38px] rounded-[20px] cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  );
}
