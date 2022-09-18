import { render, screen, waitFor } from "@testing-library/react";
import { customers } from "../../data";
import CustomerList from "./CustomerList";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const MOCKED_CUSTOMERS_LIST = {
  customers: [
    {
      id: 1,
      attributes: {
        company: "Ebert Inc",
        created_at: "1542590989",
        email: "KelleyWillms@example.com",
        first_name: "Kelley",
        last_name: "Willms",
      },
      last_updated: 1546123164,
    },
    {
      id: 2,
      attributes: {
        company: "Muller LLC",
        created_at: "1527564604",
        email: "PatienceMills@example.com",
        first_name: "Patience",
        job_title: "Legacy Directives Architect",
        last_name: "Mills",
        phone: "685-077-9075",
      },
      last_updated: 1528345580,
    },
    {
      id: 3,
      attributes: {
        created_at: "1551297202",
        email: "ElvaBarton@example.com",
        first_name: "Elva",
        last_name: "Barton",
        phone: "1-745-949-5696 x1741",
      },
      last_updated: 1546408071,
    },
  ],
  meta: {
    page: 1,
    per_page: 25,
    total: 3,
  },
};

describe("CustomerList Page", () => {
  test("renders loading message", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      );
    });
    const loadingMsg = screen.getByText(/Loading the list of customers.../i);
    expect(loadingMsg).toBeInTheDocument();
  });

  test("tries to fetch a list of customers", async () => {
    jest.spyOn(customers, "fetch");
    await act(async () => {
      render(
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      );
    });
    expect(customers.fetch).toHaveBeenCalled();
  });

  test("renders a list of customers", async () => {
    jest.spyOn(customers, "fetch").mockResolvedValueOnce({
      data: MOCKED_CUSTOMERS_LIST,
      error: "",
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      );
    });
    expect(screen.getByText("KelleyWillms@example.com")).toBeInTheDocument();
    expect(screen.getByText("PatienceMills@example.com")).toBeInTheDocument();
    expect(screen.getByText("ElvaBarton@example.com")).toBeInTheDocument();
  });
});
