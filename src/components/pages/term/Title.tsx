import { Text } from "@chakra-ui/react";
import { ComponentProps } from "react";

type TextProps = ComponentProps<typeof Text>;

interface OwnProps {
  index: number;
  text: string;
}

export const Title = ({ index, text, ...props }: OwnProps & TextProps) => {
  return (
    <Text
      fontSize={"lg"}
      textAlign={"left"}
      fontWeight={700}
      borderBottom={"1px solid"}
      my={4}
      {...props}
    >
      {`${index}. ${text}`}
    </Text>
  );
};
