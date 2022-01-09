import React from "react";
import { render } from "@testing-library/react";

import { Loading } from "./";
describe("Loading component", () => {
  it("Renders Component", () => {
    const { container } = render(<Loading />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    Loading...
  </p>
</div>
`);
  });
});
