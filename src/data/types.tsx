export type IAttributesList = [string, any][];

export interface ICustomerResult {
  id: number;
  last_updated: string;
  attributes: any;
  arrayAttributes: IAttributesList;
}

export interface ICustomerResponse {
  id: number;
  last_updated: number;
  attributes: object;
}

export interface IResponse {
  data: any;
  error: unknown;
}
