import { Box, Text } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { TopView } from "@/components/pages/index/TopView";
import { PlayButton } from "@/components/pages/index/PlayButton";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header />
      <Box textAlign={"center"}>
        <TopView />
        <PlayButton />
        {/* TODO: ↓↓↓↓↓↓ この辺りに記述するコンテンツはまだ仮 ↓↓↓↓↓↓ */}
        <Box bgColor={"gray.100"} borderRadius={4} p={4} mt={12}>
          <Text
            fontSize={"xl"}
            textAlign={"left"}
            fontWeight={700}
            borderBottom={"1px solid"}
          >
            あそびかた
          </Text>
          <Text></Text>
        </Box>

        <Box bgColor={"gray.200"} borderRadius={10} h={300}>
          <Text>コンタクト</Text>
          <Text>ご意見・ご要望はこちらの Twitter まで @ich5nkn</Text>
        </Box>
        {/* TODO: ↑↑↑↑↑↑ この辺りに記述するコンテンツはまだ仮 ↑↑↑↑↑↑ */}
        <Footer />
      </Box>
    </>
  );
}
