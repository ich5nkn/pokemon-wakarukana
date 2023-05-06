import Link from "next/link";
import { Text } from "@chakra-ui/react";

interface OwnProps {
  text: string;
  href?: string;
}

export const LinkText = ({ text, href }: OwnProps) => {
  return (
    <Text as="u" textColor="blue.500" mx={1}>
      <Link href={href ?? text}>{text}</Link>
    </Text>
  );
};
