import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/test");
  }, []);
  return <div>Home</div>;
}
