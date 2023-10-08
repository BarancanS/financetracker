"use client";
import React from "react";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";

const Carousel = () => {
  const [currencyImages, setCurrencyImages] = useState([]);
  const handleDragStart = (e) => e.preventDefault();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = [
    <Image
      src="/dollar.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
      width={50}
      height={50}
      alt="Dollar"
    />,
    <Image
      src="/turkishLira.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
      width={50}
      height={50}
      alt="Turkish Lira"
    />,
    <Image
      src="/aud.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
      width={50}
      height={50}
      alt="Aud"
    />,
    <Image
      src="/euro.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
      width={50}
      height={50}
      alt="Euro"
    />,
    <Image
      src="/pound.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
      width={50}
      height={50}
      alt="Pound"
    />,
  ];
  useEffect(() => {
    setCurrencyImages(items);
  }, []);

  return (
    <div className="w-full flex flex-row gap-5 mt-10 items-center justify-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={currencyImages}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
