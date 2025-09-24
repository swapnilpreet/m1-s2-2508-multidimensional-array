import React from 'react'

const getIngredients = (drink) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
    }
  }
  return ingredients;
};

const DrinkDetail = ({ selectedDrink, setSelectedDrink }) => {
     const ingredients = getIngredients(selectedDrink);
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => setSelectedDrink(null)}
        className="cursor-target mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
      >
        &larr; Back to list
      </button>
      <div className="cursor-target bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={selectedDrink.strDrinkThumb}
          alt={selectedDrink.strDrink}
          className="cursor-target w-full md:w-1/2 rounded-xl shadow-md"
        />
        <div className="cursor-target text-gray-800">
          <h1 className="cursor-target text-4xl font-bold mb-4">{selectedDrink.strDrink}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>{selectedDrink.strAlcoholic}</span>
            <span>•</span>
            <span>{selectedDrink.strCategory}</span>
          </div>
          <h2 className="cursor-target text-2xl font-semibold mt-6 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1 text-lg">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Instructions</h2>
          <p className="text-lg leading-relaxed">
            {selectedDrink.strInstructions}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DrinkDetail