import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface IChacterContext {
  selectedCharacter: string;
  setSelectedCharacter: Dispatch<SetStateAction<string>>;
}

const CharacterContext = createContext<IChacterContext>({
  selectedCharacter: "",
  setSelectedCharacter: () => null,
});

export const CharacterProvider: React.FC = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");

  return (
    <CharacterContext.Provider
      value={{ setSelectedCharacter, selectedCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
export default CharacterContext;
