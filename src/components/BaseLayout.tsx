import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <Box m={0} p={4} mx="auto" color="blackAlpha.700" maxW={"md"}>
    {children}
  </Box>
);
