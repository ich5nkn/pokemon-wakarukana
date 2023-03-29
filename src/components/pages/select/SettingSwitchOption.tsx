import { Box, Flex, Spacer, Switch, Text } from "@chakra-ui/react";

interface OwnProps {
  title: string;
  caption?: string;
  value: boolean;
  onChange: () => void;
}

export const SettingSwitchOption = ({
  title,
  caption,
  value,
  onChange,
}: OwnProps) => (
  <Box>
    <Flex>
      {title}
      <Spacer /> <Switch size={"lg"} isChecked={value} onChange={onChange} />
    </Flex>
    {caption && (
      <Text fontSize="sm" color="gray.400" pl={2}>
        {caption}
      </Text>
    )}
  </Box>
);
