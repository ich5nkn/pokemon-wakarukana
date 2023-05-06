import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box textAlign={"left"} padding={6} bgColor={"blue.300"} mt={4} mb={-4}>
      <Text
        color="white"
        fontSize={"lg"}
        fontWeight={700}
        borderBottom={"1px solid"}
        mb={4}
      >
        Information
      </Text>
      {/* TODO: 利用規約ページへのリンク */}
      <FooterItem name="利用規約" href="/" />
      <FooterItem
        name="連絡先 ( Twitter )"
        href="https://twitter.com/ich5nkn"
      />
      <FooterItem
        name="GitHub"
        href="https://github.com/ich5nkn/pokemon-wakarukana"
      />
    </Box>
  );
};

interface FooterItemProps {
  name: string;
  href: string;
}
const FooterItem = ({ name, href }: FooterItemProps) => {
  return (
    <Text color="white" mt={2} fontSize="sm" pl={2}>
      <Link href={href}>{name}</Link>
    </Text>
  );
};
