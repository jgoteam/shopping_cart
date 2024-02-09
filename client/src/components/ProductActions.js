import { useState } from 'react';
import EditForm from './EditForm';

const ProductActions = ({ product, setProduct }) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditFormDisplay(!editFormDisplay);
  };

  return (
    <div className="actions product-actions">
      <button className="add-to-cart">Add to Cart</button>
      <button className="edit" onClick={handleEditClick}>
        Edit
      </button>
      {editFormDisplay ? (
        <EditForm
          product={product}
          setProduct={setProduct}
          setEditFormDisplay={setEditFormDisplay}
        />
      ) : null}
    </div>
  );
};

export default ProductActions;
