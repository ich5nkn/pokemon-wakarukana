import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const onClick = async () => {
    const res = await fetch("/api/hello", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ value: "value" }),
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <>
      <button
        onClick={onClick}
        style={{ margin: "20px", width: "100px", height: "100px" }}
      >
        click
      </button>
    </>
  );
}
