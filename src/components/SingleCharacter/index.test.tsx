import React from "react";
import { GraphQLError } from "graphql";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { SingleCharacter, GET_CHARACTER } from "./";

const loadingMock = {
  request: {
    query: GET_CHARACTER,
    variables: { id: "8" },
  },
  result: {
    data: {
      character: {
        name: "Adjudicator Rick",
        id: "8",
        status: "Dead",
        species: "human",
        image: "an-image-src",
        gender: "male",
        type: "",

        episode: [
          {
            id: "",
            name: "",
          },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_CHARACTER,
    variables: { id: "8" },
  },
  error: new Error("Error"),
};

describe("SingleCharacter component", () => {
  it("Loading Shown", () => {
    const { getByText } = render(
      <MockedProvider mocks={[loadingMock]} addTypename={false}>
        <SingleCharacter selectedCharacter="8" />
      </MockedProvider>
    );

    const textElement = getByText(/Loading.../i);

    expect(textElement).toBeInTheDocument();
  });

  it("An error occurs", async () => {
    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <SingleCharacter selectedCharacter="8" />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const errorMessage = getByText(/Error/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("Modal is shown with one item", async () => {
    const { getByText, container } = render(
      <MockedProvider mocks={[loadingMock]} addTypename={false}>
        <SingleCharacter selectedCharacter="8" />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const characterName = getByText(/Adjudicator Rick/i);

    //     expect(container.firstChild).toMatchInlineSnapshot(`
    //     <ul
    //       class="list"
    //     >
    //       <li>
    //         <a
    //           class="link"
    //           href="#"
    //         >
    //           <h2
    //             class="itemName"
    //           >
    //             Adjudicator Rick
    //           </h2>
    //           <img
    //             alt="Adjudicator Rick"
    //             height="100"
    //             src="an-image-src"
    //             width="100"
    //           />
    //         </a>
    //       </li>
    //     </ul>
    //   `);

    expect(characterName).toBeInTheDocument();
  });
});
