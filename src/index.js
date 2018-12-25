import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./error-boundary";
import {
  List as PokemonList,
  ListItem as PokemonListItem,
  Detail as PokemonDetail,
  ListFallback as PokemonListFallback,
  ListError as PokemonListError,
} from "./pokemon";

function App() {
  let [selectedPokemonId, setSelectedPokemonId] = useState(1);

  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday 17">
          ⚛️🎄✌️
        </span>
        : Day 17
      </h1>
      <ErrorBoundary fallback={<PokemonListError />}>
        {selectedPokemonId > 0 ? (
          <Suspense
            maxDuration={250}
            fallback={"Finding your Pokemon..."}
          >
            <div>
              <button
                type="button"
                onClick={() => setSelectedPokemonId(0)}
              >
                👈 Back
              </button>
              <PokemonDetail pokemonId={selectedPokemonId} />
            </div>
          </Suspense>
        ) : (
          <Suspense
            maxDuration={250}
            fallback={<PokemonListFallback />}
          >
            <ul>
              <PokemonList
                renderItem={pokemon => (
                  <PokemonListItem
                    onClick={() =>
                      setSelectedPokemonId(pokemon.id)
                    }
                    key={pokemon.id}
                  >
                    {pokemon.name}
                  </PokemonListItem>
                )}
              />
            </ul>
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
