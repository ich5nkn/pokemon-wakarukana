import { UseToastOptions, useToast } from "@chakra-ui/react";

export interface ToastArgs {
  isCorrect: boolean;
  name?: string;
  name2?: string;
}

const createToast = ({
  isCorrect,
  name,
  name2,
}: ToastArgs): UseToastOptions => ({
  title: isCorrect ? "正解" : "不正解",
  status: isCorrect ? "success" : "error",
  duration: isCorrect ? 2000 : 5000,
  isClosable: true,
  description: isCorrect ? "" : `${name}${name2 ? `（${name2}）` : ""}`,
});

export const useShowToast = () => {
  const toast = useToast();

  const pushToast = (args: ToastArgs) => {
    toast.closeAll();
    toast(createToast(args));
  };

  return pushToast;
};
