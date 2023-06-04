import { Image, Box, HStack } from "@chakra-ui/react";
import style from "@/styles/carousel.module.css";
import { useRef, useState } from "react";

interface OwnProps {
  images: {
    path: string;
    alt?: string;
  }[];
}

export const Carousel = ({ images }: OwnProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = x - startX;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <Box>
      <HStack
        className={style.carouselWrapper}
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {images.map((image, i) => {
          return (
            <Image
              key={i}
              alt={image.alt || ""}
              src={image.path}
              draggable={false}
              userSelect="none"
              className={style.carouselImage}
            />
          );
        })}
      </HStack>
    </Box>
  );
};
