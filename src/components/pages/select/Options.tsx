import { useState } from "react";
import { Button, Checkbox, Collapse, VStack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { SettingOptions } from "@/types";

interface OwnProps {
  title: string;
  options: SettingOptions;
  updateOptions: (options: SettingOptions) => void;
}

export const Options = ({ title, options, updateOptions }: OwnProps) => {
  const [open, setOpen] = useState(false);
  const allChecked = options.every(({ value }) => value);
  const isIndeterminate = options.some(({ value }) => value) && !allChecked;

  const onClickCheck = (targetId: number, value: boolean) => {
    const targetIndex = options.findIndex(({ id }) => id === targetId);
    if (targetIndex === -1) return;
    const newOptions = options.map((option) => ({ ...option }));
    newOptions.splice(targetIndex, 1, {
      ...options[targetIndex],
      value,
    });
    updateOptions(newOptions);
  };

  const onClickAllCheck = (value: boolean) => {
    const newOptions = options.map((option) => ({ ...option, value }));
    updateOptions(newOptions);
  };
  return (
    <>
      <Button
        variant={"ghost"}
        size="sm"
        leftIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={() => setOpen(!open)}
      >
        {title}
      </Button>
      <Collapse in={open} animateOpacity>
        <VStack pl="4" mt="2" align={"left"}>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => onClickAllCheck(e.target.checked)}
          >
            すべてチェックする
          </Checkbox>
          {options.map(({ id, value, name }) => (
            <Checkbox
              key={id}
              isChecked={value}
              onChange={(e) => onClickCheck(id, e.target.checked)}
            >
              {name}
            </Checkbox>
          ))}
        </VStack>
      </Collapse>
    </>
  );
};
