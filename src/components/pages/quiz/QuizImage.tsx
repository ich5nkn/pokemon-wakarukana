import Image from "next/image";
import { Center, Spinner } from "@chakra-ui/react";

interface OwnProps {
  loadingImg: boolean;
  onLoadingComplete: () => void;
  src?: string;
}

export const QuizImage = ({ loadingImg, onLoadingComplete, src }: OwnProps) => {
  if (!src) return null;
  return (
    <Center mx={"auto"} maxW="75%" my={4} h={264}>
      <Spinner hidden={!loadingImg} size={"xl"} />
      <Image
        src={src}
        alt="pokemon image"
        width={264}
        height={264}
        unoptimized={true}
        loading="eager"
        onLoadingComplete={onLoadingComplete}
        hidden={loadingImg}
      />
    </Center>
  );
};
