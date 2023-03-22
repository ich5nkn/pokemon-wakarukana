import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface OwnProps {
  color: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Card = ({ color, onClick, children }: OwnProps) => (
  <Box onClick={onClick} borderRadius="md" border={`2px solid ${color}`} py={4}>
    {children}
  </Box>
);
