"use client"
import Header from '@/app/components/header/header'
import React, { useState } from 'react'
import humansImg from "../../../../public/assets/authImgs/humans.svg"
import Image from 'next/image'
import SignUp from '@/app/components/form/signUp'
import SignIn from '@/app/components/form/signIn'

export default function Auth() {
  const [checkType, setCheckType] = useState(false)
  return (
    <>
    <Header />
    <div className='flex items-center gap-[173px]'>
      <Image src={humansImg} alt='humans ' />
      {checkType ? <SignUp setCheckType ={setCheckType } /> : <SignIn setCheckType ={setCheckType } />}
    </div>
    </>
 
  )
}
