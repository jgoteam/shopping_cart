import Product from "./Product";
import AddForm from "./AddForm";
import shopService from "../services/shopService";

const ProductList = ({ products, setProducts, cart, setCart }) => {
  const handleDeleteClick = async (e, product) => {
    e.preventDefault();

    try {
      await shopService.deleteProduct(product._id);
      setProducts(
        products.filter((existingProduct) => existingProduct._id != product._id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="product-listing">
        <ul className="product-list">
          {products.map((product) => {
            return (
              <div className="product" key={product._id}>
                <button
                  className="align-right delete-button"
                  onClick={(e) => handleDeleteClick(e, product)}
                >
                  <span>X</span>
                </button>
                <Product
                  key={product._id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                />
              </div>
            );
          })}
        </ul>
      </div>
      <AddForm products={products} setProducts={setProducts} />
    </>
  );
};

export default ProductList;
