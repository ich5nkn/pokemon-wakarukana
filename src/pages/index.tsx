import { useRef } from "react";
import Image from "next/image";
import styles from "@/styles/top.module.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useOnScreen } from "@/hooks/useOnScreen";

export default function Home() {
  const topRef = useRef<HTMLDivElement>(null);
  const showTopView = useOnScreen(topRef);
  return (
    <Box textAlign={"center"}>
      <Box
        h={12}
        p={2}
        position="fixed"
        top={0}
        left={0}
        right={0}
        justifyContent={"space-between"}
        display={showTopView ? "none" : "flex"}
        zIndex={1}
        bgColor={"white"}
      >
        <Box>
          <Text className={styles.header_title}>ポケモンわかるかな?</Text>
        </Box>
        <HamburgerIcon boxSize={8} />
      </Box>
      <Box className={styles.fade} ref={topRef}>
        <Box className={styles.endless_scroll}>
          <Image
            alt=""
            src="/img/top-pokemons.png"
            height={1000}
            width={1000}
          />
          <Image
            alt=""
            src="/img/top-pokemons.png"
            height={1000}
            width={1000}
          />
        </Box>
        <Text className={styles.top_title}>ポケモンわかるかな?</Text>
      </Box>
      <Button
        w="75%"
        p={6}
        mt={6}
        mx="auto"
        bgColor="blue.500"
        color="white"
        onClick={() => {}}
        rightIcon={<ChevronRightIcon />}
      >
        プレイする
      </Button>
      <Box bgColor={"gray.200"} borderRadius={10}>
        <Text>あそびかた</Text>
      </Box>
      <Box bgColor={"gray.200"} borderRadius={10}>
        <Text>殿堂入り</Text>
      </Box>
      <Box bgColor={"gray.200"} borderRadius={10}>
        <Text>コンタクト</Text>
        <Text>ご意見・ご要望はこちらの Twitter まで @ich5nkn</Text>
      </Box>
    </Box>
  );
}
