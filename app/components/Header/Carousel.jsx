"use client";
import React from "react";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";

const Carousel = () => {
  const [trendCoins, setTrendCoins] = useState([]);
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
    <img
      src="/dollar.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
    />,
    <img
      src="/turkish-lira.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
    />,
    <img
      src="/aud.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
    />,
    <img
      src="/euro.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
    />,
    <img
      src="/pound.png"
      onDragStart={handleDragStart}
      role="presentation"
      className="mx-auto w-20"
    />,
  ];

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
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
