import { ICustomerResponse, ICustomerResult } from "./types";
import { format } from "date-fns";

export function customerAdapter(response: ICustomerResponse): ICustomerResult {
  return {
    ...response,
    last_updated: format(
      new Date(response.last_updated * 1000),
      "LLL do uuuu, h:mm aaa"
    ),
    arrayAttributes: Object.keys(response.attributes).map((key: string) => {
      return [
        key,
        response.attributes[key as keyof typeof response.attributes],
      ];
    }),
  };
}
