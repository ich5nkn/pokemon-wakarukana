import { useState } from "react";
import { BallCard } from "@/components/pages/index/BallCard";
import { SettingCard } from "@/components/pages/index/SettingCard";
import { SettingModal } from "@/components/pages/index/SettingModal";
import { Grid, Heading } from "@chakra-ui/react";

const Select = () => {
  const [open, setOpen] = useState(false);

  return (
    <Grid gap={8} my={12}>
      <Heading>難易度を選択してね</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <BallCard type="monster" onClick={() => {}} />
        <BallCard type="super" onClick={() => {}} />
        <BallCard type="hyper" onClick={() => {}} />
        <BallCard type="master" onClick={() => {}} />
      </Grid>
      <SettingCard
        onClick={() => {
          setOpen(true);
        }}
      />
      <SettingModal open={open} onClose={() => setOpen(false)} />
    </Grid>
  );
};

export default Select;
