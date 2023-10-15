import { render, screen } from "@testing-library/react";
import Expense from "./Expense";

describe("Expense component", () => {
  test("Matching 'Money Spend' is in the component", () => {
    //Arrange
    render(<Expense />);

    //Act

    //Assert
    const moneyElement = screen.getByText("money spend", { exact: false });
    expect(moneyElement).toBeInTheDocument();
  });
  test("Matching 'Description' is in the component", () => {
    //Arrange
    render(<Expense />);

    //Act

    //Assert
    const descriptionElement = screen.getByText("Description", {
      exact: false,
    });
    expect(descriptionElement).toBeInTheDocument();
  });
  test("Matching 'Category' is in the component", () => {
    //Arrange
    render(<Expense />);

    //Act

    //Assert
    const categoryElement = screen.getByText("Category", { exact: false });
    expect(categoryElement).toBeInTheDocument();
  });
});
