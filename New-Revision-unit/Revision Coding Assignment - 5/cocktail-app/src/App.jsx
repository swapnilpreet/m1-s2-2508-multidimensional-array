import { useEffect, useRef, useState } from "react";
import DrinkDetail from "./Components/DrinkDetail";
import Header from "./components/Header";
import DrinkList from "./Components/DrinkList";
import TargetCursor from "./UICode/TargetCursor";

const App = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("Non_Alcoholic");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const throttleTimeout = useRef(null);
  const searchDebounceTimeout = useRef(null);
  const drinksPerPage = 5;

  // Debounce logic for the search input
  useEffect(() => {
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }
    searchDebounceTimeout.current = setTimeout(() => {
      fetchDrinks();
    }, 500);
    return () => clearTimeout(searchDebounceTimeout.current);
  }, [searchTerm, currentCategory]);

  // Fetch drinks from TheCocktailDB API
  const fetchDrinks = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";
    let url = `${baseUrl}filter.php?a=${currentCategory}`;
    if (searchTerm) {
      url = `${baseUrl}search.php?s=${searchTerm}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDrinks(data.drinks || []);
    } catch (e) {
      console.log(e);
      setError(
        "Failed to fetch drinks. Please check your internet connection and try again."
      );
      setDrinks([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle drink card click
  const handleCardClick = async (drinkId) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatusMessage("Submitting your cocktail creation...");
    setTimeout(() => {
      setStatusMessage(
        "Your recipe has been successfully saved! Redirecting to the cocktail detail."
      );
    }, 2000);
    setTimeout(async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSelectedDrink(data.drinks[0]);
      } catch (e) {
        console.error("Failed to fetch drink details:", e);
        setStatusMessage("Failed to load drink details. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 5000);
  };

  // Throttling for Prev/Next buttons
  const throttlePagination = (callback) => {
    if (throttleTimeout.current) {
      return;
    }
    callback();
    throttleTimeout.current = setTimeout(() => {
      throttleTimeout.current = null;
    }, 500);
  };

  // Calculate total pages and visible drinks
  const totalPages = Math.ceil(drinks.length / drinksPerPage);
  const startIndex = (currentPage - 1) * drinksPerPage;
  const endIndex = startIndex + drinksPerPage;
  const visibleDrinks = drinks.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-900">
      <TargetCursor 
              spinDuration={2}
              hideDefaultCursor={true}
            />
      {/* Status Message Display */}
      <div className="cursor-target fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          className={`cursor-target p-4 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-500 ${
            isSubmitting ? "opacity-100" : "opacity-0"
          } ${
            statusMessage.includes("successfully")
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
        >
          {statusMessage}
        </div>
      </div>

      {selectedDrink ? (
        <DrinkDetail
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
        />
      ) : (
        <div className="p-8">
          <Header
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <DrinkList
            visibleDrinks={visibleDrinks}
            isSubmitting={isSubmitting}
            handleCardClick={handleCardClick}
            totalPages={totalPages}
            currentPage={currentPage}
            throttlePagination={throttlePagination}
            setCurrentPage={setCurrentPage}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </div>
  );
};
export default App;
