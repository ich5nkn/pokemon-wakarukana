import { SettingOptions } from "@/types";
import { Box, Button, Checkbox, Collapse } from "@chakra-ui/react";
import { useState } from "react";

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
      <Button onClick={() => setOpen(!open)}>{title}</Button>
      <Collapse in={open} animateOpacity>
        <Box pl="4" mt="2">
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
        </Box>
      </Collapse>
    </>
  );
};
