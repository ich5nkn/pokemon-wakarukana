import { OptionsType } from "@/types";
import { loadLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useReducer, createContext, ReactNode, useContext } from "react";

interface Answered {
  correct: number;
  incorrect: number;
}

export interface GlobalState {
  options?: OptionsType;
  displayed: string[];
  answered: Answered;
  loadedLocalStorage: boolean;
}

type Action =
  | { type: "updateOptions"; value: OptionsType }
  | { type: "addDisplayed"; value: string }
  | { type: "addCorrect" }
  | { type: "addIncorrect" }
  | { type: "loadLocalStorage"; value: GlobalState };

const initialGlobalState = {
  displayed: [],
  answered: { correct: 0, incorrect: 0 },
};

export const GlobalContext = createContext<{
  globalState: GlobalState;
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

const globalReducer = (prev: GlobalState, action: Action) => {
  switch (action.type) {
    case "updateOptions": {
      const newValue = { ...prev, options: action.value };
      setLocalStorage(newValue);
      return newValue;
    }
    case "addDisplayed": {
      const newValue = {
        ...prev,
        displayed: [...prev.displayed, action.value],
      };
      setLocalStorage(newValue);
      return newValue;
    }
    case "addCorrect": {
      const newValue = {
        ...prev,
        answered: { ...prev.answered, correct: prev.answered.correct + 1 },
      };
      setLocalStorage(newValue);
      return newValue;
    }
    case "addIncorrect": {
      const newValue = {
        ...prev,
        answered: { ...prev.answered, incorrect: prev.answered.incorrect + 1 },
      };
      setLocalStorage(newValue);
      return newValue;
    }
    case "loadLocalStorage":
      return action.value;
    default:
      return prev;
  }
};

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
