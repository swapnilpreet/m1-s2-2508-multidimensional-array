import React from 'react'
import { Link } from 'react-router-dom'

const DisplayPokemon = ({pokemon}) => {
  return (
    <div>
         <div
            style={{
              border: `2px solid ${
                pokemon.types.some((t) => t.type.name === "fire")
                  ? "red"
                  : pokemon.types.some((t) => t.type.name === "water")
                  ? "blue"
                  : "gray"
              }`,
              background:
                pokemon.base_experience > 100 ? "lightgreen" : "white",
              padding: "1rem",
            }}
          >
            <Link to={`/details/${pokemon.id}`}>
              <h3>
                {pokemon.name} {pokemon.base_experience > 100 ? "⚡" : ""}
              </h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Base XP: {pokemon.base_experience}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            </Link>
          </div>
    </div>
  )
}

export default DisplayPokemon