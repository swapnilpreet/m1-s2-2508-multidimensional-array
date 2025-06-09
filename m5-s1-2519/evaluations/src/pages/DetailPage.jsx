import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
        setError(null);
      } catch (err) {
        console.log(err)
        setError('Failed to load Pokémon');
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to Dashboard</button>
      <h2>{pokemon.name} {pokemon.base_experience > 100 && '⚡'}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <p>Abilities: {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
      <p>Moves: {pokemon.moves.slice(0, 5).map((m) => m.move.name).join(', ')}</p>
      <div>
        <h3>All Sprites:</h3>
        {Object.values(pokemon.sprites).filter((v) => typeof v === 'string').map((url, i) => (
          <img key={i} src={url} alt={`sprite-${i}`} style={{ width: '50px' }} />
        ))}
      </div>
    </div>
  );
}