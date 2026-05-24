"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/lola1.JPG", alt: "Lola 1" },
  { src: "/lola2.JPG", alt: "Lola 2" },
  { src: "/lola3.JPG", alt: "Lola 3" },
  { src: "/lola4.JPG", alt: "Lola 4" },
];

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden md:aspect-[3/2]">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={3648}
          height={2432}
          className={`absolute inset-0 h-full w-full object-cover brightness-50 transition-opacity duration-[3000ms] ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-orange-300/10" />
    </div>
  );
}
