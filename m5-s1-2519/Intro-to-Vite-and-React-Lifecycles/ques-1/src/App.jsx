import "./App.css";
import AutoCorrectApp from "./components/AutoCorrectApp";
import Counter from "./components/Counter";
import ProfileCard from "./components/ProfileCard";
import ToggleButton from "./components/ToggleButton";

function App() {
  return (
    <>
      <div className="card">
        {/* question-1 */}
        <div>
          <h2 style={{ textAlign: "center" }}>Simple Counter App</h2>
          <Counter initialValue={2} />
        </div>
        {/* question-2 */}
        <div>
          <h2 style={{ textAlign: "center" }}>Toggle Button Component</h2>
          <ToggleButton />
        </div>
        {/* question-3 */}
        <div>
          <h2 style={{ textAlign: "center" }}>User Profiles</h2>
          <ProfileCard
            name="Alice Johnson"
            age={28}
            bio="Alice is a passionate software engineer with over 6 years of experience in frontend development and UI/UX design. She loves open source and community building."
          />
          <ProfileCard age={35} bio="Bio missing name — uses default name." />
          <ProfileCard name="Bob Smith" age={42} />
        </div>
        {/* question-4 */}
        <AutoCorrectApp />
      </div>
    </>
  );
}

export default App;
