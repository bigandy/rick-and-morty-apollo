import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CharacterProvider } from "./context/CharacterContext";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
