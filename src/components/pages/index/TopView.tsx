import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import styles from "@/styles/top.module.css";

export const TopView = () => {
  return (
    <>
      <Box className={styles.fade}>
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
    </>
  );
};
