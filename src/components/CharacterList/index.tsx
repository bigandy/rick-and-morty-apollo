import React, { useContext } from "react";

import { gql, useQuery } from "@apollo/client";

import CharacterContext from "../../context/CharacterContext";

import { Loading } from "../Loading";

import styles from "./styles.module.scss";

export const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        image
        id
      }
    }
  }
`;

type CharacterData = {
  name: string;
  status: string;
  image: string;
  id: string;
};

export const CharacterList: React.FC = () => {
  const { loading, data, error } = useQuery(GET_ALL_CHARACTERS);

  const { setSelectedCharacter } = useContext(CharacterContext);

  if (loading) return <Loading />;
  if (error) return <p>Error :( {error.message}</p>;

  if (data.characters.results.length > 0) {
    return (
      <ul className={styles.list}>
        {data.characters.results.map((character: CharacterData) => {
          return (
            <li key={`character-${character.name}`}>
              <button
                className={styles.link}
                onClick={() => setSelectedCharacter(character.id)}
              >
                <h2 className={styles.itemName}>{character.name}</h2>
                <img
                  src={character.image}
                  alt={character.name}
                  width="100"
                  height="100"
                />
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <p>No characters found</p>;
  }
};
