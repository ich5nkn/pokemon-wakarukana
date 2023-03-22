import Image from "next/image";
import { Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import { Card } from "@/components/Card";

export const SettingCard = ({ onClick }: { onClick: () => void }) => (
  <Card color="#EB9494" onClick={onClick}>
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem>
        <Center>
          <Image
            src="/img/setting-icon.png"
            alt="setting"
            height={96}
            width={96}
          />
        </Center>
      </GridItem>
      <GridItem>
        <Center height={"100%"}>
          <Heading fontSize="md" verticalAlign={"middle"}>
            難易度を
            <br />
            カスタマイズする
          </Heading>
        </Center>
      </GridItem>
    </Grid>
  </Card>
);
