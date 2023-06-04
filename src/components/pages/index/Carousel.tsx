import { Image, Box, HStack } from "@chakra-ui/react";
import style from "@/styles/carousel.module.css";

interface OwnProps {
  images: {
    path: string;
    alt?: string;
  }[];
}

export const Carousel = ({ images }: OwnProps) => {
  return (
    <Box>
      <HStack className={style.carouselWrapper}>
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
