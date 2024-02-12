import usdFormat from "../utils/currencyFormatter";

const ProductInfo = ({ product }) => {
  return (
    <>
      <h3>{product.title}</h3>
      <p className="price">{usdFormat(product.price)}</p>
      <p className="quantity">{product.quantity} left in stock</p>
    </>
  );
};

export default ProductInfo;
