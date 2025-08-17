import ProductsList from "./components/ProductsList";
import CartSummary from "./components/CartSummary";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini E-Commerce (Vite)</h1>
      <ProductsList />
      <CartSummary />
    </div>
  );
}
