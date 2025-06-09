import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../features/pokemon/pokemonSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { offset } = useSelector((state) => state.pokemon);

  return (
    <div>
      <button onClick={() => dispatch(prevPage())} disabled={offset === 0}>
        Previous
      </button>
      <button onClick={() => dispatch(nextPage())}>Next</button>
    </div>
  );
};

export default Pagination;
