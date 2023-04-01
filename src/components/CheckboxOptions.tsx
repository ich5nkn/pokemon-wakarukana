import { useState } from "react";
import { Checkbox, Collapse, VStack } from "@chakra-ui/react";
import { SettingOptions } from "@/types";
import { SettingSwitchOption } from "./pages/select/SettingSwitchOption";
import { VERSIONS } from "@/constants/version";

interface OwnProps {
  title: string;
  options: SettingOptions;
  updateOptions: (options: SettingOptions) => void;
  disabled?: boolean;
}

export const CheckboxOptions = ({
  title,
  options,
  updateOptions,
  disabled,
}: OwnProps) => {
  const allChecked = options.every(({ value }) => value);
  const [open, setOpen] = useState(!allChecked);
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
      <SettingSwitchOption
        title={title}
        value={open}
        onChange={() => setOpen(!open)}
        disabled={disabled}
      />
      <Collapse in={open} animateOpacity>
        <VStack pl="4" mt="2" align={"left"}>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => onClickAllCheck(e.target.checked)}
            isDisabled={disabled}
          >
            すべてチェックする
          </Checkbox>
          {options.map(({ id, value }) => (
            <Checkbox
              key={id}
              isChecked={value}
              onChange={(e) => onClickCheck(id, e.target.checked)}
              isDisabled={disabled}
            >
              {VERSIONS.find((version) => version.id === id)?.name}
            </Checkbox>
          ))}
        </VStack>
      </Collapse>
    </>
  );
};
