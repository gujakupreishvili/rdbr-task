import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from "../button/button";
import { Product } from "../basketComponent/basketComponent";

type BasketItemProps = {
  product: Product;
  updateQuantity: (id: number, color: string, size: string, newQuantity: number) => void;
  deleteItem: (id: number, color: string, size: string) => void;
};

export default function BasketItem({ product, updateQuantity, deleteItem }: BasketItemProps) {
  const colorIndex = product.available_colors.indexOf(product.color);
  const displayImage =
    colorIndex !== -1 && product.images[colorIndex]
      ? product.images[colorIndex]
      : product.cover_image;

  const price = product.price * product.quantity;

  return (
    <div
      key={`${product.id}-${product.color}-${product.size}`}
      className="flex items-center gap-[17px]"
    >
      <Image
        src={displayImage}
        alt={`${product.name} - ${product.color}`}
        width={100}
        height={134}
        className="shadow-gray-300 rounded-[10px] border-[1px] border-[#E1DFE1]"
      />
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <p className="text-[#10151F] text-[15px] font-poppins font-medium pb-[10.5px]">
            {product.name}
          </p>
          <p className="text-[#10151F] text-[18px] font-poppins font-medium">
            ${price}
          </p>
        </div>
        <p className="text-[#3E424A] font-popins font-normal pb-[8px] text-[12px]">
          {product.color}
        </p>
        <p className="pb-[13px] text-[12px] font-poppins font-normal text-[#3E424A]">
          {product.size}
        </p>
        <div className="flex w-full justify-between">
          <div className="flex items-center border-[1px] border-[#E1DFE1] rounded-[22px] w-[70px] h-[26px] justify-center gap-[9px] px-[8px] py-[4px]">
            <FiMinus
              className={` ${
                product.quantity == 1 ? "text-[#E1DFE1] cursor-not-allowed" : "cursor-pointer"
              } `}
              onClick={() => updateQuantity(product.id, product.color, product.size, product.quantity - 1)}
            />
            <p>{product.quantity}</p>
            <FiPlus
              className="cursor-pointer "
              onClick={() => updateQuantity(product.id, product.color, product.size, product.quantity + 1)}
            />
          </div>
          <Button
            onClick={() => deleteItem(product.id, product.color, product.size)}
            text="Remove"
            className="text-[#3E424A] text-[12px] font-poppins font-normal hover:text-red-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
