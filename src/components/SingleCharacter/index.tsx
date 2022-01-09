import React, { useContext } from "react";

import CharacterContext from "../../context/CharacterContext";
import { Loading } from "../Loading";

import { gql, useQuery } from "@apollo/client";

import styles from "./styles.module.scss";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      id
      status
      species
      type
      gender

      image
      episode {
        id
        name
      }
    }
  }
`;

type EpisodeType = {
  name: string;
};

type SingleCharacterType = {
  selectedCharacter: string;
};

export const SingleCharacter: React.FC<SingleCharacterType> = ({
  selectedCharacter,
}) => {
  const { setSelectedCharacter } = useContext(CharacterContext);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: selectedCharacter },
  });

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p>Error {error.message}</p>
      </div>
    );
  }

  const close = () => {
    setSelectedCharacter("");
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={close}>Close Modal</button>
      <h1>{data.character.name}</h1>
      <h2>{data.character.species}</h2>
      <img src={data.character.image} alt="" />

      <h3>Episodes</h3>

      <ul className={styles.list}>
        {data.character.episode.map((episode: EpisodeType) => {
          return <li key={episode.name}>{episode.name}</li>;
        })}
      </ul>
    </div>
  );
};
