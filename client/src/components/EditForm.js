import { useState } from "react";
import shopService from "../services/shopService";

const EditForm = ({ product, setProduct, setEditFormDisplay }) => {
  const [formValues, setFormValues] = useState(product);

  const setField = (field) => {
    return ({ target: { value } }) => {
      setFormValues({ ...formValues, [field]: value });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = await shopService(product._id, formValues);

      if (updatedProduct) {
        console.log("Product updated successfully");
        setProduct({ ...product, ...updatedProduct });
        setEditFormDisplay(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            aria-label="Product Name"
            value={formValues.title}
            onChange={setField("title")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            aria-label="Product Price"
            value={formValues.price}
            onChange={setField("price")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            aria-label="Product Quantity"
            value={formValues.quantity}
            onChange={setField("quantity")}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditFormDisplay(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
