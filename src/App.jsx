import { Routes, Route } from "react-router";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
