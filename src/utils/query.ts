import { VERSIONS } from "@/constants/version";
import { OptionsType } from "@/types";
import { AnyObject } from "@/types/utils";
import queryString from "querystring";

export const optionsToQuery = (options: OptionsType) => {
  return queryString.stringify({
    ...options,
    versions: options.versions.filter(({ value }) => value).map(({ id }) => id),
  });
};

export const queryToOptions = (query: AnyObject): OptionsType => {
  try {
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
        value: query.versions.includes(String(version.id)),
      })),
    };
    return options;
  } catch (e) {
    throw e;
  }
};
