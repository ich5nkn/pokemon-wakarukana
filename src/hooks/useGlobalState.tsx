import { initialOptions } from "@/constants/options";
import { OptionsType } from "@/types";
import { useReducer, createContext, ReactNode, useContext } from "react";

/**
 * TODO:
 * GlobalState ( Reducer ) を Context で配信する
 * 各種 State に対して更新をかける CustomHook を作成する
 * 使いたいところ（参照・更新）で、CustomHook を使用する
 * query を使って options を渡しているところを修正する
 * */

interface Global {
  options: OptionsType;
}

type Action = { type: "options"; value: OptionsType };

const initialGlobalState = {
  options: initialOptions,
};

export const GlobalContext = createContext<{
  globalState: Global;
  dispatch: (action: Action) => void;
}>({
  globalState: initialGlobalState,
  dispatch: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);
  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const globalReducer = (prev: Global, action: Action) => {
  switch (action.type) {
    case "options":
      return { ...prev, options: action.value };
    default:
      return prev;
  }
};

export const useGlobalState = () => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const updateOptions = (options: OptionsType) =>
    dispatch({ type: "options", value: options });
  return { globalState, updateOptions };
};
