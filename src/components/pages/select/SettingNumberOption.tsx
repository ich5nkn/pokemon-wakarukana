import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
} from "@chakra-ui/react";

interface OwnProps {
  title: string;
  value: number;
  onChange: (n: number) => void;
}

export const SettingNumberOption = ({ title, value, onChange }: OwnProps) => (
  <Flex alignItems={"center"}>
    {title}
    <Spacer />
    <NumberInput
      value={value}
      onChange={(_str, num) => onChange(num)}
      defaultValue={10}
      step={10}
      min={10}
      max={1200}
      precision={0}
      maxW={24}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </Flex>
);