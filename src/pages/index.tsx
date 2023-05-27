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

        <Box mt={16} p={4} bgColor={"blue.100"} lineHeight={2}>
          <Text fontSize={"xl"} fontWeight={700} mb={2} as={"h2"}>
            このサイトについて
          </Text>
          <Text mb={2}>
            ポケモンの画像を見て名前を答える、シンプルなゲームが遊べるサイトです！
          </Text>
          <Text>
            １９９６年に発売された赤・緑バージョンとともに１５１匹のポケモンが誕生し、現在では１，０００匹を超える多種多様なポケモンが存在しています。あなたはどれくらいポケモンの名前を答えられますか？
            このサイトでは、ポケモンを全く知らない人から、毎日ポケモンで遊んでいる方まで楽しめる難易度がそろっています。自分で難易度を調節することもできます、ぜひ遊んでみてください！
          </Text>
        </Box>

        <Box my={4} p={4} bgColor={"red.100"}>
          <Text fontSize={"xl"} fontWeight={700} mb={2} as={"h2"}>
            ギャラリー
          </Text>
          カルーセルでのプレイ画面のプレビューを実装 react-slick を使う
          デザイン等が決まってから最後に実装
        </Box>
        {/* TODO: ↑↑↑↑↑↑ この辺りに記述するコンテンツはまだ仮 ↑↑↑↑↑↑ */}
        <Footer />
      </Box>
    </>
  );
}
