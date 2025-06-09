import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, settypeFilter } from "../features/pokemon/pokemonSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { typeFilter, sort } = useSelector((state) => state.pokemon);

  return (
    <div>
      <label>Filter by Type: </label>
      <select
        value={typeFilter}
        onChange={(e) => dispatch(settypeFilter(e.target.value))}
      >
        <option value="">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>

      <label>Sort by Name: </label>
      <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
        <option value="">None</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
};

export default Filters;
