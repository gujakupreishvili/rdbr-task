import React from 'react'
import logo from "../../../../public/assets/headerImgs/Logo.svg"
import shoppingCartIcon from "../../../../public/assets/headerImgs/shopping-cart.svg"
import arrowDownIcon from "../../../../public/assets/headerImgs/arrowDown.svg"
import Image from 'next/image'

export default function Header() {
  return (
    <div className='flex items-center justify-between px-[100px] py-[20px]'>
      <Image src={logo} alt='logo' />
      <div className='flex items-center gap-[21.61px]'>
        <Image  src={shoppingCartIcon} alt='shopping Cart Icon'/>
        <div className='flex items-center gap-[7px]'>
        <div className='w-[40px] h-[40px] rounded-[20px] bg-black'></div>
        <Image src={arrowDownIcon} alt='arrowDown Icon' />
        </div>
      </div>
    </div>
  )
}
