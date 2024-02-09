import Product from './Product';

const ProductList = ({ list }) => {
  return (
    <div className="product-listing">
      <ul className="product-list">
        {list.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default ProductList;