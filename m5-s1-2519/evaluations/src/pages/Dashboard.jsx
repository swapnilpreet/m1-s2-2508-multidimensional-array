import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fechFaild,
  fetchPending,
  fetchSuccess,
} from "../features/pokemon/pokemonSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import DisplayPokemon from "./DisplayPokemon";
import ErrorBanner from "../components/ErrorBanner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, offset, limit, typeFilter, sort, status} = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(fetchPending());
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const promises = res.data.results.map((p) => axios.get(p.url));
        const rawResults = (await Promise.all(promises)).map((r) => r.data);
        dispatch(fetchSuccess(rawResults));
      } catch (err) {
        dispatch(fechFaild(err.message));
      }
    };
    fetchPokemons();
  }, [offset]);

  let visiblePokemons = [...list];

  if (typeFilter) {
    visiblePokemons = visiblePokemons.filter((p) =>
      p.types.some((t) => t.type.name === typeFilter)
    );
  }

  if (sort === "asc")
    visiblePokemons.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "desc")
    visiblePokemons.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <div>
      {status === "loading" && <Loader />}
      {status === "failed" &&  <ErrorBanner/>}
      {status === "succeeded"}
      <h1>Pokémon Explorer</h1>
      <Filters />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {visiblePokemons.map((pokemon) => (
          <DisplayPokemon pokemon={pokemon} key={pokemon.id}/>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Dashboard;
