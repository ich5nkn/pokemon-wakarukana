import { Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Card } from "@/components/Card";
import { BALLS_CONTENT, BallType } from "@/constants/balls";

interface OwnProps {
  type: BallType;
  onClick: () => void;
}

export const BallCard = ({ type, onClick }: OwnProps) => (
  <Card color={BALLS_CONTENT[type].color} onClick={onClick}>
    <Center>
      <Image
        src={BALLS_CONTENT[type].imgPath}
        alt={BALLS_CONTENT[type].alt}
        height={96}
        width={96}
      />
    </Center>
    <Text fontSize={"md"} textAlign="center" mt="2">
      {`${BALLS_CONTENT[type].name}`}
    </Text>
  </Card>
);
