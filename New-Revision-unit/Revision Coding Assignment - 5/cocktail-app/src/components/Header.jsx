import SplitText from "../UICode/SplitText";
import TargetCursor from "../UICode/TargetCursor";

const Header = ({
  currentCategory,
  setCurrentCategory,
  searchTerm,
  setSearchTerm,
}) => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <div className="text-center mb-8">
    
      <SplitText
        // className="cursor-target"
        text="Explore Cocktails"
        className="cursor-target text-5xl font-bold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <p className="cursor-target text-lg md:text-xl text-gray-600 mt-2">
        A delicious journey through the world's finest drinks.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
        <div className="cursor-target flex space-x-2 p-1 bg-gray-200 rounded-full shadow-inner">
          <button
            onClick={() => setCurrentCategory("Alcoholic")}
            className={`cursor-target px-6 py-2 rounded-full font-semibold transition duration-300 ${
              currentCategory === "Alcoholic"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Alcoholic
          </button>
          <button
            onClick={() => setCurrentCategory("Non_Alcoholic")}
            className={`cursor-target px-6 py-2 rounded-full font-semibold transition duration-300 ${
              currentCategory === "Non_Alcoholic"
                ? "bg-white text-gray-900 shadow-md"
                : "text-gray-600 hover:bg-gray-300"
            }`}
          >
            Non-Alcoholic
          </button>
        </div>
        <input
          type="text"
          placeholder="Search for a drink..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="cursor-target w-full max-w-md px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md"
        />
      </div>
    </div>
  );
};

export default Header;