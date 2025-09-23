"use client";
import React, { useEffect, useState } from "react";
import filterIcon from "../../../../public/assets/contentImgs/filterIcon.svg";
import Image from "next/image";
import arrowDown from "../../../../public/assets/headerImgs/arrowDown.svg";
import axios from "axios";
import arrowLeft from "../../../../public/assets/contentImgs/arrow left.svg";
import arrowRight from "../../../../public/assets/contentImgs/arrowRigh.svg";
import Button from "../button/button";
import { useRouter, useSearchParams } from "next/navigation";
import FilterPrice from "../filterPrice/filterPrice";
import removeIcon from "../../../../public/assets/contentImgs/remove.svg";
import Sort from "../sort/sort";

type productsType = {
  id: number;
  price: number;
  cover_image: string;
  name: string;
};

export default function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSort = (() => {
    const sortParam = searchParams.get("sort");
    if (sortParam === "-created_at") return "new";
    if (sortParam === "price") return "priceLow";
    if (sortParam === "-price") return "priceHigh";
    return "";
  })();

  const [lastPage, setLastPage] = useState<number>(1);
  const [filterstate, setFilterstate] = useState(false);
  const [sortState, setSortState] = useState(false);

  const [products, setProducts] = useState<productsType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [buttonCount, setButtonCount] = useState<number>(0);
  const [priceFrom, setPriceFrom] = useState<number>(
    Number(searchParams.get("priceFrom")) || 0
  );
  const [priceTo, setPriceTo] = useState<number>(
    Number(searchParams.get("priceTo")) || 0
  );

  const [sortOption, setSortOption] = useState<
    "new" | "priceLow" | "priceHigh" | ""
  >(initialSort);
  const [meta, setMeta] = useState<{ total: number; per_page: number }>({
    total: 0,
    per_page: 10,
  });

  const getData = async (
    page: number,
    priceFrom: number,
    priceTo: number,
    sort: string = ""
  ) => {
    try {
      const res = await axios.get(
        `https://api.redseam.redberryinternship.ge/api/products?page=${page}&filter[price_from]=${
          priceFrom || ""
        }&filter[price_to]=${priceTo || ""}${sort ? `&sort=${sort}` : ""}`
      );
      setProducts(res.data.data);
      setLastPage(res.data.meta.last_page);
      setMeta({ total: res.data.meta.total, per_page: res.data.meta.per_page });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (type: "new" | "priceLow" | "priceHigh") => {
    setSortOption(type);
    setSortState(false);

    let sortParam = "";
    if (type === "new") sortParam = "-created_at";
    if (type === "priceLow") sortParam = "price";
    if (type === "priceHigh") sortParam = "-price";

    getData(currentPage, priceFrom, priceTo, sortParam);
  };

  const RemovePrices = () => {
    setPriceFrom(0);
    setPriceTo(0);
    setButtonCount(buttonCount + 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getPages = () => {
    if (lastPage <= 5) return Array.from({ length: lastPage }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, "...", lastPage - 1, lastPage];
    if (currentPage >= lastPage - 1)
      return [1, 2, "...", lastPage - 1, lastPage];
    return [currentPage - 1, currentPage, "...", lastPage - 1, lastPage];
  };

  useEffect(() => {
    let sortParam = "";
    if (sortOption === "new") sortParam = "-created_at";
    if (sortOption === "priceLow") sortParam = "price";
    if (sortOption === "priceHigh") sortParam = "-price";

    getData(currentPage, priceFrom, priceTo, sortParam);

    const query = new URLSearchParams();
    query.set("page", String(currentPage));
    if (priceFrom) query.set("priceFrom", String(priceFrom));
    if (priceTo) query.set("priceTo", String(priceTo));
    if (sortOption) query.set("sort", sortParam);

    router.replace(`?${query.toString()}`);
  }, [currentPage, buttonCount, sortOption]);

  const handleClick = (productId: number) => {
    router.push(`/productabout/${productId}`); 
  }

  return (
    <div className="flex flex-col px-[100px] mt-[72px] ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#10151F] text-[42px] font-poppins font-semibold">
            Products
          </h1>
          {priceFrom || priceTo ? (
            <div className="flex border-[#E1DFE1] border-[1px] rounded-[50px] py-[8px]  w-[158px] gap-[12px] justify-center">
              <p className="text-[14px] text-[#3E424A] font-poppins font-normal ">
                Price:{" "}
                {priceFrom && priceTo
                  ? `${priceFrom}-${priceTo}`
                  : priceFrom
                  ? `${priceFrom} +`
                  : priceTo
                  ? `0 - ${priceTo}`
                  : ""}
              </p>
              <Image
                src={removeIcon}
                alt="remove"
                className="cursor-pointer"
                onClick={RemovePrices}
              />
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-[32px]">
          <p className="text-[12px] text-[#3E424A] font-poppins font-normal">
            showing <span>{(currentPage - 1) * meta.per_page + 1}</span> -{" "}
            <span>{Math.min(currentPage * meta.per_page, meta.total)}</span> of{" "}
            <span>{meta.total}</span> results
          </p>

          <div className="w-[1px] h-[14px] bg-[#E1DFE1]"></div>

          {/* Filter */}
          <div className="relative">
            <div
              onClick={() => {
                setFilterstate(!filterstate), setSortState(false);
              }}
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <Image src={filterIcon} alt="filterIcon" />
              <p className="text-[16px] text-[#10151F] font-poppins font-normal">
                Filter
              </p>
            </div>
            {filterstate && (
              <FilterPrice
                priceFrom={priceFrom}
                priceTo={priceTo}
                setPriceFrom={setPriceFrom}
                setPriceTo={setPriceTo}
                onApply={() => {
                  setCurrentPage(1);
                  setFilterstate(false);
                  setButtonCount(buttonCount + 1);
                }}
              />
            )}
          </div>

          {/* Sort */}
          <div className="relative ">
            <div
              onClick={() => {
                setSortState(!sortState), setFilterstate(false);
              }}
              className="flex items-center gap-[6px] cursor-pointer"
            >
              <p className="font-poppins text-[#10151F] font-normal">
                {sortOption === "new"
                  ? "New products first"
                  : sortOption === "priceLow"
                  ? "Price, low to high"
                  : sortOption === "priceHigh"
                  ? "Price, high to low"
                  : "Sort by"}
              </p>
              <Image
                src={arrowDown}
                alt="arrow down"
                className={`${sortState ? "rotate-180" : ""}`}
              />
            </div>
            {sortState && <Sort onSortChange={handleSortChange} />}
          </div>
        </div>
      </div>
      {products.length > 0 ? (
        <>
          <div className="mt-[32px] flex flex-wrap justify-start gap-[2.4%]">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="max-w-[399px] w-full flex flex-col gap-[12px] mb-[48px] cursor-pointer"
              >
                <div className="w-full h-[549px] relative rounded-[8px] shadow-md shadow-gray-500">
                  <Image
                    src={item.cover_image}
                    alt={item.name}
                    fill
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h2 className="text-[#000000] font-poppins font-medium text-[18px] first-letter:uppercase">
                    {item.name}
                  </h2>
                  <p className="text-[#10151F] font-poppins text-[16px] font-medium">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[42px] w-full flex items-center justify-center mb-[216px] gap-[8px]">
            <Image
              onClick={handlePrev}
              src={arrowLeft}
              alt="arrow"
              className="w-[12px] h-[12px] cursor-pointer"
            />
            {getPages().map((page, idx) =>
              typeof page === "number" ? (
                <Button
                  key={idx}
                  onClick={() => setCurrentPage(page)}
                  className={`w-[32px] h-[32px] rounded-[4px] border-[1px] flex items-center justify-center font-poppins ${
                    currentPage === page
                      ? "border-[#FF4000] text-[#FF4000]"
                      : "border-[#F8F6F7] text-black"
                  }`}
                  text={String(page)}
                />
              ) : (
                <Button
                  key={idx}
                  className="w-[32px] h-[32px] rounded-[4px] border-[1px] border-[#F8F6F7] flex items-center justify-center font-poppins"
                  text="..."
                />
              )
            )}
            <Image
              onClick={handleNext}
              src={arrowRight}
              alt="arrow"
              className="w-[12px] h-[12px] cursor-pointer"
            />
          </div>
        </>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="text-[22px] font-semibold font-poppins">No result</p>
        </div>
      )}
    </div>
  );
}
