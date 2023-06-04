import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
        <meta
          name="description"
          content="ポケモンの画像を見て、名前を当てるクイズゲームです。ブラウザ上から遊べます。ポケモンをあまり知らない人から、ポケモン上級者まで自分に合った難易度で遊べます。"
        />
        <meta property="og:url" content="https://pokemon-wakarukana.com" />
        <meta property="og:title" content="ポケモンわかるかな?" />
        <meta property="og:site_name" content="ポケモンわかるかな?" />
        <meta
          property="og:description"
          content="ポケモンの画像を見て、名前を当てるゲームです。あなたのレベルに合わせたクイズの設定が可能です。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://pokemon-wakarukana.com/img/twitter-ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ich5nkn" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Darumadrop+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
