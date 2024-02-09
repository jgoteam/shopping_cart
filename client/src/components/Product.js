import { useState } from 'react';
import ProductActions from './ProductActions';

const Product = ({ product }) => {
  const [thisProduct, setThisProduct] = useState(product);

  return (
    <li key={thisProduct.id} className="product">
      <div className="product-details">
        <h3>{thisProduct.title}</h3>
        <p className="price">{thisProduct.price}</p>
        <p className="quantity">{thisProduct.quantity} left in stock</p>
        {/* <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={handleEditClick}>
            Edit
          </button>
          {editFormDisplay ? (
            <EditForm
              product={thisProduct}
              setThisProduct={setThisProduct}
              setEditFormDisplay={setEditFormDisplay}
            />
          ) : null}
        </div> */}
        <ProductActions product={thisProduct} setProduct={setThisProduct} />
        <button className="delete-button">
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

export default Product;