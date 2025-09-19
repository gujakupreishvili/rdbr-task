import React from 'react'
import Image, { StaticImageData } from "next/image";

type Props = {
  text?: string
  icon?: React.ElementType | undefined
  Img?: StaticImageData
  className?: string 
  pTagStyle?: string
  iconStyle?: string
  isSelected?: boolean 
  onClick?: () => void     
}

export default function Button({ 
  text, 
  icon: Icon, 
  Img, 
  className = "", 
  pTagStyle, 
  iconStyle, 
  isSelected = false, 
  onClick 
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        ${className}
        ${isSelected ? "bg-[#E3E8EF]" : ""}
      `}
    >
      {Icon && <Icon className={iconStyle} />}
      {Img && <Image src={Img} alt="button icon" />}
      {text && <p className={pTagStyle}>{text}</p>}
    </button>
  )
}
