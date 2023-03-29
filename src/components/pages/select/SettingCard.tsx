import Image from "next/image";
import { Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import { Card } from "@/components/Card";

export const SettingCard = ({ onClick }: { onClick: () => void }) => (
  <Card color="#EB9494" onClick={onClick}>
    <Center>
      <Image src="/img/setting-icon.png" alt="setting" height={96} width={96} />
    </Center>
    <Heading fontSize={"md"} textAlign="center" mt="2">
      {`カスタマイズ`}
    </Heading>
  </Card>
);
