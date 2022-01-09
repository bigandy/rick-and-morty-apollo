import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { CharacterList, GET_ALL_CHARACTERS } from "./";

const loadingMock = {
  request: {
    query: GET_ALL_CHARACTERS,
    variables: {},
  },
  result: {
    data: {
      characters: {
        results: [
          {
            name: "Adjudicator Rick",
            id: "8",
            status: "Dead",
            image: "an-image-src",
          },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_ALL_CHARACTERS,
    variables: {},
  },
  error: new Error("Something went wrong"),
};

describe("CharacterList component", () => {
  it("Loading Shown", () => {
    const { getByText } = render(
      <MockedProvider mocks={[loadingMock]} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    const textElement = getByText(/Loading.../i);

    expect(textElement).toBeInTheDocument();
  });

  it("An error occurs", async () => {
    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const errorMessage = getByText(/Error/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("A list is shown with one item", async () => {
    const { getByText, container } = render(
      <MockedProvider mocks={[loadingMock]} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const characterName = getByText(/Adjudicator Rick/i);

    expect(container.firstChild).toMatchInlineSnapshot(`
<ul
  class="list"
>
  <li>
    <button
      class="link"
    >
      <h2
        class="itemName"
      >
        Adjudicator Rick
      </h2>
      <img
        alt="Adjudicator Rick"
        height="100"
        src="an-image-src"
        width="100"
      />
    </button>
  </li>
</ul>
`);

    expect(characterName).toBeInTheDocument();
  });
});
