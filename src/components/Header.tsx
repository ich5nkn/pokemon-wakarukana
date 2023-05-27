import { Box, Text } from "@chakra-ui/react";
import styles from "@/styles/top.module.css";
import Link from "next/link";
import { HeaderMenu } from "./HeaderMenu";

interface OwnProps {
  fetchQuiz?: () => void;
}

export const Header = ({ fetchQuiz }: OwnProps) => {
  const title = "ポケモンわかるかな?";
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
        <Text className={styles.header_title} as={"h1"}>
          {fetchQuiz ? title : <Link href={"/"}>{title}</Link>}
        </Text>

        {fetchQuiz && <HeaderMenu fetchQuiz={fetchQuiz} />}
      </Box>
      {/* Header の下に要素が隠れないようにするための placeholder */}
      <Box h={12} display={"hidden"} />
    </>
  );
};
