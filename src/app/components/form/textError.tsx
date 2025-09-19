import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function TextError({ children, className = "" }: Props) {
  return <p className={`text-[#FF4000] pb-[2px] ${className}`}>{children}</p>;
}
