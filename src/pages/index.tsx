import { BallCard } from "@/components/pages/index/BallCard";
import { SettingCard } from "@/components/pages/index/settingCard";
import { Grid, Heading } from "@chakra-ui/react";

const Home = () => {
  const fetchApi = async () => {
    const res = await fetch("/api/hello");
    const json = await res.json();
    console.log(json);
  };

  return (
    <Grid gap={8} my={12}>
      <Heading>難易度を選択してね</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <BallCard type="monster" onClick={() => {}} />
        <BallCard type="super" onClick={() => {}} />
        <BallCard type="hyper" onClick={() => {}} />
        <BallCard type="master" onClick={() => {}} />
      </Grid>
      <SettingCard onClick={() => {}} />
    </Grid>
  );
};

export default Home;
