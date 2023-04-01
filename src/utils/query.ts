import { VERSIONS } from "@/constants/version";
import { OptionsType } from "@/pages/select";
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
      isChoice: Boolean(query.isChoice),
      showHint: Boolean(query.showHint),
      isSilhouette: Boolean(query.isSilhouette),
      hasRegion: Boolean(query.hasRegion),
      hasAnotherForm: Boolean(query.hasAnotherForm),
      hasMega: Boolean(query.hasMega),
      hasGigantic: Boolean(query.hasGigantic),
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
