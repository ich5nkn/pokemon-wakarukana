import Script from "next/script";

export const Analytics = () => {
  const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (process.env.NODE_ENV !== "production" || !ANALYTICS_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
};
