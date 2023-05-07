import Image from "next/image";
import { Center } from "@chakra-ui/react";
import { Spinner } from "./Spinner";

interface OwnProps {
  loadingImg: boolean;
  onLoadingComplete: () => void;
  src?: string;
}

export const QuizImage = ({ loadingImg, onLoadingComplete, src }: OwnProps) => {
  return (
    <Center mx={"auto"} maxW="75%" my={4} h={264}>
      {loadingImg && <Spinner />}
      {src && (
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
      )}
    </Center>
  );
};
