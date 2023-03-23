import { Center, GridItem, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { Card } from "@/components/Card";

type BallType = "monster" | "super" | "hyper" | "master";
type BallContent = {
  imgPath: string;
  name: string;
  alt: string;
  color: string;
};

interface OwnProps {
  type: BallType;
  onClick: () => void;
}

const BALLS_CONTENT: { [key in BallType]: BallContent } = {
  monster: {
    name: "モンスターボール",
    imgPath: "/img/balls/monster-ball.png",
    alt: "monster-ball",
    color: "#EB9494",
  },
  super: {
    name: "スーパーボール",
    imgPath: "/img/balls/super-ball.png",
    alt: "super-ball",
    color: "#9594EB",
  },
  hyper: {
    name: "ハイパーボール",
    imgPath: "/img/balls/hyper-ball.png",
    alt: "hyper-ball",
    color: "#EBD294",
  },
  master: {
    name: "マスターボール",
    imgPath: "/img/balls/master-ball.png",
    alt: "master-ball",
    color: "#D994EB",
  },
} as const;

export const BallCard = ({ type, onClick }: OwnProps) => (
  <GridItem>
    <Card color={BALLS_CONTENT[type].color}>
      <Center>
        <Image
          src={BALLS_CONTENT[type].imgPath}
          alt={BALLS_CONTENT[type].alt}
          height={96}
          width={96}
        />
      </Center>
      <Heading fontSize={"md"} textAlign="center" mt="2">
        {`${BALLS_CONTENT[type].name}級`}
      </Heading>
    </Card>
  </GridItem>
);
