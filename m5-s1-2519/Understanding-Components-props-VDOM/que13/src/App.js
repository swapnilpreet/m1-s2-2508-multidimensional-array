import Header from "./components/Header";
import PlanCard from "./components/PlanCard";

function App() {
  const plans = [
    {
      title: "Starter",
      price: 0,
      isFree: true,
      features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"]
    },
    {
      title: "Lorem Plus",
      price: 32.0,
      isFree: false,
      features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"]
    },
    {
      title: "Lorem Pro",
      price: 50.0,
      isFree: false,
      features: ["1 lorem ipsum", "Lorem, ipsum dolor.", "Monthly Updates"]
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <div>
        {plans.map((plan, idx) => (
          <PlanCard key={idx} {...plan} />
        ))}
      </div>
    </div>
  );
}

export default App;
