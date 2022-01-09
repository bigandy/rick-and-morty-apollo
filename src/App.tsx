import React, { useContext } from "react";

import { CharacterList } from "./components/CharacterList";
import { Title } from "./components/Title";
import CharacterContext from "./context/CharacterContext";

import { Dialog } from "@reach/dialog";
import { SingleCharacter } from "./components/SingleCharacter";

export const App: React.FC = () => {
  const { selectedCharacter, setSelectedCharacter } =
    useContext(CharacterContext);

  return (
    <div className="App">
      <header className="App-header">
        <Title text="Rick and Morty App" />
        <CharacterList />
        {selectedCharacter !== "" && (
          <Dialog
            aria-label="Selected Character Modal"
            isOpen={selectedCharacter !== ""}
            onDismiss={() => setSelectedCharacter("")}
          >
            {" "}
            <SingleCharacter selectedCharacter={selectedCharacter} />
          </Dialog>
        )}
      </header>
    </div>
  );
};
