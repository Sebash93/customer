import { AxiosError } from "axios";
import { customerAdapter } from "./adapters";
import { IResponse } from "./types";

import api from "./api";

export async function fetch(page: number = 1): Promise<IResponse> {
  try {
    const result = await api.get("/customers", {
      params: {
        page,
      },
    });
    const customers = result.data.customers.map(customerAdapter);
    return {
      data: { ...result.data, customers },
      error: "",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error instanceof AxiosError ? error.message : error,
    };
  }
}

export async function fetchOne(id: string): Promise<IResponse> {
  try {
    const result = await api.get(`/customers/${id}`);
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
}
