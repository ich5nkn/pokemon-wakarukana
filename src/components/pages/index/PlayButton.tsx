import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const PlayButton = () => {
  const router = useRouter();
  return (
    <Button
      w="75%"
      p={6}
      mt={12}
      mx="auto"
      bgColor="blue.500"
      color="white"
      onClick={() => router.push("/select")}
      rightIcon={<ChevronRightIcon />}
    >
      プレイする
    </Button>
  );
};
