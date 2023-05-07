import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { keyframes } from "@emotion/react";

const rotateLeft = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

export const Spinner = () => {
  return (
    <Box animation={`${rotateLeft} 1s ease-in infinite`}>
      <Image src="/img/loading.png" alt="" height={100} width={100} />
    </Box>
  );
};
