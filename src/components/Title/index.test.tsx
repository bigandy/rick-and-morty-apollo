import React from "react";
import { render } from "@testing-library/react";

import { Title } from "./";
describe("Title component", () => {
  it("Renders Component", () => {
    const { getByText } = render(<Title text="Test component Title" />);

    const textElement = getByText(/Test component Title/i);

    expect(textElement).toBeInTheDocument();
  });
});
