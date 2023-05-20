import { Box, Text } from "@chakra-ui/react";
import styles from "@/styles/top.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <Box
        h={12}
        p={2}
        position="fixed"
        top={0}
        left={0}
        right={0}
        mx={"auto"}
        justifyContent={"space-between"}
        display={"flex"}
        maxW={"md"}
        zIndex={1}
        bgColor={"white"}
      >
        <Link href={"/"}>
          <Text className={styles.header_title} as={"h1"}>
            ポケモンわかるかな?
          </Text>
        </Link>
        <HamburgerIcon
          boxSize={8}
          // TODO: Menu の実装
        />
      </Box>
      {/* Header の下に要素が隠れないようにするための placeholder */}
      <Box h={12} display={"hidden"} />
    </>
  );
};
