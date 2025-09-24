import React from "react";
import DrinkCard from "./DrinkCard";
import Loader from "../UICode/Loader";

const DrinkList = ({
  visibleDrinks,
  isSubmitting,
  handleCardClick,
  totalPages,
  currentPage,
  throttlePagination,
  setCurrentPage,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (visibleDrinks.length === 0) {
    return (
      <div className="cursor-target text-center py-10 text-gray-600">
        No drinks found. Try a different search or category.
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleDrinks.map((drink) => (
          <DrinkCard
            key={drink.idDrink}
            drink={drink}
            handleCardClick={handleCardClick}
            isSubmitting={isSubmitting}
          />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() =>
            throttlePagination(() =>
              setCurrentPage((prev) => Math.max(1, prev - 1))
            )
          }
          disabled={currentPage === 1 || isSubmitting}
          className={`cursor-target px-4 py-2 rounded-lg font-semibold transition duration-300 ${
            currentPage === 1 || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => throttlePagination(() => setCurrentPage(index + 1))}
            disabled={isSubmitting}
            className={`cursor-target w-10 h-10 rounded-lg font-bold transition duration-300 ${
              currentPage === index + 1
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            throttlePagination(() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            )
          }
          disabled={currentPage === totalPages || isSubmitting}
          className={`cursor-target px-4 py-2 rounded-lg font-semibold transition duration-300 ${
            currentPage === totalPages || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DrinkList;
