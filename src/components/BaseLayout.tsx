import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <Box p={4} mx="auto" color="blackAlpha.700" maxW={"sm"}>
    {children}
  </Box>
);
