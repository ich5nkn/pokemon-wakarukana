import { OptionsType } from "@/pages/select";
import queryString from "querystring";

export const optionsToQuery = (options: OptionsType) => {
  return queryString.stringify({
    ...options,
    versions: options.versions.filter(({ value }) => value).map(({ id }) => id),
  });
};
