import { AxiosError } from "axios";
import { customerAdapter } from "./adapters";

import api from "./api";

export const REQUIRED_ATTRS = ["email", "created_at"];

function validateRequiredFields(attributes: any) {
  return !Object.keys(attributes).some(
    (attrKey) => !attributes[attrKey] && REQUIRED_ATTRS.includes(attrKey)
  );
}

export async function patch(customerId: string, attributes: any) {
  const validFields = validateRequiredFields(attributes);
  if (validFields) {
    try {
      const result = await api.patch(`/customers/${customerId}`, {
        customer: {
          attributes,
        },
      });
      const customer = customerAdapter(result.data.customer);
      return {
        data: customer,
        error: "",
      };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof AxiosError ? error.message : error,
      };
    }
  } else {
    return {
      data: null,
      error: "A required field can not be removed",
    };
  }
}
