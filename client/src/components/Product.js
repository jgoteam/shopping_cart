import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

const Product = ({ product, cart, setCart }) => {
  const [thisProduct, setThisProduct] = useState(product);

  return (
    <li key={thisProduct._id} className="product">
      <div className="product-details">
        <ProductInfo product={thisProduct} />
        <ProductActions
          product={thisProduct}
          setProduct={setThisProduct}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </li>
  );
};

export default Product;
