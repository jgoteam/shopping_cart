/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import ProductActions from "./ProductActions";

const mockProduct = {
  id: 3,
  title: "Yamaha Portable Keyboard",
  quantity: 2,
  price: 155.99,
};

afterEach(() => jest.resetAllMocks());

test("Clicking 'Edit' button once shows edit form with correct values", async () => {
  const user = userEvent.setup();
  render(<ProductActions product={mockProduct} />);
  const editButton = screen.getByRole("button", { name: "Edit" });

  await user.click(editButton);
  const editHeader = screen.getByRole("heading", { level: 3 });
  const editFormNameInput = screen.getByRole("textbox", { name: "Product Name" });
  const editFormPriceInput = screen.getByRole("spinbutton", { name: "Product Price" });
  const editFormQuantityInput = screen.getByRole("spinbutton", { name: "Product Quantity" });

  expect(editHeader).toBeInTheDocument();
  expect(editFormNameInput).toHaveValue("Yamaha Portable Keyboard");
  expect(editFormPriceInput).toHaveValue(155.99);
  expect(editFormQuantityInput).toHaveValue(2);
});

test("Clicking 'Edit' button twice correctly hides edit form", async () => {
  const user = userEvent.setup();
  render(<ProductActions product={mockProduct} />);
  const editButton = screen.getByRole("button", { name: "Edit" });

  await user.click(editButton);
  const editHeader = screen.getByRole("heading", { level: 3 });
  await user.click(editButton);
  expect(editHeader).not.toBeInTheDocument();
});

test("Clicking edit form's 'Cancel' button correctly hides edit form", async () => {
  const user = userEvent.setup();
  render(<ProductActions product={mockProduct} />);
  const editButton = screen.getByRole("button", { name: "Edit" });

  await user.click(editButton);
  const editFormCancelButton = screen.getByRole("button", { name: "Cancel" });
  await user.click(editFormCancelButton);
  expect(editFormCancelButton).not.toBeInTheDocument();
});
