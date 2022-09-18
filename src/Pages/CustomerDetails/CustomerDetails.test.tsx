import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { attributes, customers } from "../../data";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import CustomerDetails from "./CustomerDetails";

const MOCKED_CUSTOMER = {
  id: 3,
  attributes: {
    created_at: "1551297202",
    email: "ElvaBarton@example.com",
    first_name: "Elva",
  },
  arrayAttributes: [
    ["created_at", "1551297202"],
    ["email", "ElvaBarton@example.com"],
    ["first_name", "Elva"],
  ],
  last_updated: "May 12th 2020",
};

describe("CustomerDetails Page", () => {
  test("renders loading message", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/customers/3"]}>
          <Routes>
            <Route
              path="/customers/:customerId"
              element={<CustomerDetails />}
            ></Route>
          </Routes>
        </MemoryRouter>
      );
    });
    const loadingMsg = screen.getByText(/Loading customer data.../i);
    expect(loadingMsg).toBeInTheDocument();
  });

  test("tries to fetch the data of customer with the provided id", async () => {
    jest.spyOn(customers, "fetchOne");
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/customers/3"]}>
          <Routes>
            <Route
              path="/customers/:customerId"
              element={<CustomerDetails />}
            ></Route>
          </Routes>
        </MemoryRouter>
      );
    });
    expect(customers.fetchOne).toHaveBeenCalledWith("3");
  });

  describe("When customer data is available", () => {
    beforeEach(async () => {
      jest.spyOn(customers, "fetchOne").mockResolvedValueOnce({
        data: MOCKED_CUSTOMER,
        error: "",
      });

      await act(async () => {
        render(
          <MemoryRouter initialEntries={["/customers/3"]}>
            <Routes>
              <Route
                path="/customers/:customerId"
                element={<CustomerDetails />}
              ></Route>
            </Routes>
          </MemoryRouter>
        );
      });
    });

    test("renders the data of the customer", async () => {
      expect(screen.getByText("Elva")).toBeInTheDocument();
      expect(screen.getByText("1551297202")).toBeInTheDocument();
    });

    describe("when clicking on edit button", () => {
      beforeEach(() => {
        const editBtn = screen.getByText("Edit");
        fireEvent.click(editBtn);
      });

      test("shows the edit component", () => {
        expect(screen.getByText("Save Changes")).toBeInTheDocument();
      });

      test("calls the patch function when clicking on edit button", async () => {
        jest.spyOn(attributes, "patch");
        const saveBtn = screen.getByText("Save Changes");
        fireEvent.click(saveBtn);
        expect(attributes.patch).toHaveBeenCalled();
      });
    });
  });
});
