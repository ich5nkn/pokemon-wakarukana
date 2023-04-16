import { VERSIONS } from "@/constants/version";
import { OptionsType } from "@/types";
import { AnyObject } from "@/types/utils";
import queryString from "querystring";

export type validQuery = { [k in keyof OptionsType]: string } & {
  versions: string | string[];
};

export const checkQuery = (query: AnyObject): query is OptionsType => {
  return (
    "numberOfQuiz" in query &&
    "isChoice" in query &&
    "showHint" in query &&
    "isSilhouette" in query &&
    "hasRegion" in query &&
    "hasAnotherForm" in query &&
    "hasMega" in query &&
    "hasGigantic" in query &&
    "versions" in query
  );
};

export const optionsToQuery = (options: OptionsType) => {
  return queryString.stringify({
    ...options,
    versions: options.versions.filter(({ value }) => value).map(({ id }) => id),
  });
};

export const queryToOptions = (query: validQuery): OptionsType => {
  try {
    const versions = Array.isArray(query.versions)
      ? query.versions
      : [query.versions];
    const options = {
      numberOfQuiz: Number(query.numberOfQuiz),
      isChoice: query.isChoice === "true",
      showHint: query.showHint === "true",
      isSilhouette: query.isSilhouette === "true",
      hasRegion: query.hasRegion === "true",
      hasAnotherForm: query.hasAnotherForm === "true",
      hasMega: query.hasMega === "true",
      hasGigantic: query.hasGigantic === "true",
      versions: VERSIONS.map((version) => ({
        id: version.id,
        value: versions.includes(String(version.id)),
      })),
    };
    return options;
  } catch (e) {
    throw e;
  }
};
