import { Box, Text } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Title } from "@/components/pages/term/Title";
import { LinkText } from "@/components/pages/term/LinkText";
import Head from "next/head";

const Term = () => {
  return (
    <>
      <Head>
        <title>ポケモンわかるかな? | 利用規約</title>
      </Head>
      <Header />
      <Box
        fontSize={"xl"}
        fontWeight={700}
        textColor={"white"}
        p={2}
        backgroundColor={"blue.400"}
      >
        利用規約
      </Box>
      <Box m={4} mb={16}>
        <Title index={1} text="著作権" />
        <Text>
          本サイトのコンテンツを無断で転用することを禁じます。
          <br />
          本サイトにおいて使用されているポケモンの画像及びポケモンの名前情報は、「ポケモンずかん」(
          <LinkText text="https://zukan.pokemon.co.jp/" />)
          より取得したものです。これらの著作権は、株式会社ポケモンに帰属しております。
          事前に、株式会社ポケモンへ「ポケモンずかん」に掲載されている情報の使用許諾についてメールにて問い合わせを行い、自己責任においての使用が許可された旨の回答を頂いております。
          そのため、本サイトではこれらの画像を使用しております。
          本サイトの存在は株式会社ポケモンに報告済みであり、万が一問題が指摘された場合には速やかに公開を停止いたします。
        </Text>
        <Title index={2} text="広告及び収益化" />
        <Text>
          本サイトは、趣味で自己学習のために作成されており、利用者に対して無償で提供されています。
          しかしながら、アクセス数が増加することにより、サービス提供のためのコストが増大した場合、
          本サイトの運営およびサービスの維持のために広告掲載や有料コンテンツの提供などの収益化手段を検討することがあります。
          本サイトの運営者は、収益化手段の変更や広告掲載に関する情報を適切に通知することを心掛けますが、事前の通知なしに広告や有料コンテンツが追加されることがあります。
          ユーザーは、本サイトに掲載される広告や有料コンテンツについて、運営者に対して責任を追求しないことに同意するものとします。
        </Text>
        <Title index={3} text="免責事項" />
        <Text>
          本サイトの運営者は、本サイトで提供される情報に関連して発生したいかなる損害についても責任を負いません。これには、間接的、偶発的、特別、懲罰的、またはその他の損害が含まれます。
          本サイトの利用者は、自己責任で本サイトを利用するものとします。
          また、本サイトの運営者は自己の都合により、いつでも本サイトの配信を停止することができます。
        </Text>
        <Title index={4} text="改定" />
        <Text>
          本サイトの運営者は、本規約を随時更新または改定する権利を留保します。本規約の変更は、本ページ上で公開された時点で効力を生じるものとします。
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default Term;
