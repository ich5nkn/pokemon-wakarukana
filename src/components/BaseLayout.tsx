import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <Box m={4} color="blackAlpha.700">
    {children}
  </Box>
);
