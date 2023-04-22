import { BALLS_CONTENT, BallType } from "@/constants/balls";
import { Box, Center, Text } from "@chakra-ui/react";
import Image from "next/image";

interface OwnProps {
  selectedTypeOptions?: BallType;
}

export const SelectedTypeView = ({ selectedTypeOptions }: OwnProps) => {
  if (!selectedTypeOptions) return null;
  const content = BALLS_CONTENT[selectedTypeOptions];
  return (
    <Box>
      <Center>
        <Image src={content.imgPath} alt={content.alt} height={96} width={96} />
      </Center>
      <Text fontWeight={700} mt={2} textAlign={"center"}>
        {content.name}
      </Text>
    </Box>
  );
};
