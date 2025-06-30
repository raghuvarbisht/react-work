import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css";

interface Slide {
  image: string;
  caption?: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, interval = 5000 }) => {
  const [current, setCurrent] = useState<number>(0);
  const timeoutRef = useRef<any>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, interval]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.image} alt={`Slide ${index}`} />
            {slide.caption && <div className="carousel-caption">{slide.caption}</div>}
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
