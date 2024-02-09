// import data from "./mockData/data";
import { useEffect, useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import AddForm from "./AddForm";

const API_BASE_URL = "http://localhost:5001/api";

const App = () => {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/products`);

        if (response.ok) {
          setProducts(await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div id="app">
      <Header cart={[]} />
      <main>
        <ProductList list={products} />
        <AddForm />
      </main>
    </div>
  );
};

export default App;
