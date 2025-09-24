import React from 'react'

const DrinkCard = ({ drink, handleCardClick, isSubmitting }) => {
  return (
    <div
    key={drink.idDrink}
    onClick={() => handleCardClick(drink.idDrink)}
    className={`cursor-target bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    <img
      src={drink.strDrinkThumb}
      alt={drink.strDrink}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg font-semibold text-center text-gray-800">{drink.strDrink}</h3>
  </div>
  )
}

export default DrinkCard