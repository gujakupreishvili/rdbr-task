"use client";
import { Suspense } from "react";
import Content from "./components/content/content";
import Header from "./components/header/header";


export default function Home() {
  return (
    <>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
    </>
  );
}
