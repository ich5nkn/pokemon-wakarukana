import { GlobalState } from "@/hooks/useGlobalState";

export const setLocalStorage = (globalState: GlobalState) => {
  localStorage.setItem("global", JSON.stringify(globalState));
};

// TODO: GlobalState のユーザ定義型ガードを実装する
const isGlobalState = (globalState: unknown): globalState is GlobalState => {
  return true;
};

export const loadLocalStorage = (): GlobalState | undefined => {
  try {
    const global = localStorage.getItem("global");
    if (!global) return;
    const value = JSON.parse(global);
    if (isGlobalState(value)) return value;
  } catch (e) {
    console.log("error!", e);
    return;
  }
};
