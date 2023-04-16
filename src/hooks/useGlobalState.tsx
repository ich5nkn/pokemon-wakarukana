import { OptionsType } from "@/types";
import { useReducer, createContext, ReactNode, useContext } from "react";

interface Answered {
  correct: number;
  incorrect: number;
}

interface Global {
  options?: OptionsType;
  displayed: string[];
  answered: Answered;
}

type Action =
  | { type: "updateOptions"; value: OptionsType }
  | { type: "addDisplayed"; value: string }
  | { type: "addCorrect" }
  | { type: "addIncorrect" }
  | { type: "reStart" };

const initialGlobalState = {
  displayed: [],
  answered: { correct: 0, incorrect: 0 },
};

export const GlobalContext = createContext<{
  globalState: Global;
  globalStateDispatch: (action: Action) => void;
}>({
  globalState: initialGlobalState,
  globalStateDispatch: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [globalState, globalStateDispatch] = useReducer(
    globalReducer,
    initialGlobalState
  );
  return (
    <GlobalContext.Provider value={{ globalState, globalStateDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const globalReducer = (prev: Global, action: Action) => {
  switch (action.type) {
    case "updateOptions":
      return { ...prev, options: action.value };
    case "addDisplayed":
      return { ...prev, displayed: [...prev.displayed, action.value] };
    case "addCorrect":
      return {
        ...prev,
        answered: { ...prev.answered, correct: prev.answered.correct + 1 },
      };
    case "addIncorrect":
      return {
        ...prev,
        answered: { ...prev.answered, incorrect: prev.answered.incorrect + 1 },
      };
    case "reStart":
      return {
        ...initialGlobalState,
        options: prev.options,
      };
    default:
      return prev;
  }
};

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
