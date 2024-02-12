// import data from "./mockData/data";
import { useEffect, useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import shopService from "../services/shopService";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await shopService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await shopService.getCart();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div id="app">
      <Header cart={cart} setCart={setCart} />
      <main>
        <ProductList
          products={products}
          setProducts={setProducts}
          cart={cart}
          setCart={setCart}
        />
      </main>
    </div>
  );
};

export default App;
