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
  disabled?: boolean;
}

export const SettingNumberOption = ({
  title,
  value,
  onChange,
  disabled,
}: OwnProps) => (
  <Flex alignItems={"center"}>
    {title}
    <Spacer />
    <NumberInput
      value={isNaN(value) ? "" : value}
      onChange={(_str, num) => onChange(num)}
      defaultValue={10}
      step={10}
      min={10}
      max={1200}
      precision={0}
      maxW={24}
      isDisabled={disabled}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </Flex>
);
