import { useGlobalState } from "@/hooks/useGlobalState";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const RestartButton = () => {
  const router = useRouter();
  const { globalStateDispatch } = useGlobalState();

  const onClickNewGame = () => {
    globalStateDispatch({ type: "reStart" });
    router.push("/select");
  };

  return (
    <Button
      w="100%"
      p={6}
      bgColor="blue.500"
      color="white"
      onClick={onClickNewGame}
    >
      もういちど遊ぶ
    </Button>
  );
};
