import { useState } from "react";
import shopService from "../services/shopService";

const AddForm = ({ products, setProducts }) => {
  const [formDisplay, setFormDisplay] = useState({
    button: true,
    form: false,
  });
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
  });

  const handleFormToggleClick = (e) => {
    e.preventDefault();

    setFormDisplay({
      ...formDisplay,
      button: !formDisplay.button,
      form: !formDisplay.form,
    });
  };

  const setField = (field) => {
    return ({ target: { value } }) => {
      setFormValues({ ...formValues, [field]: value });
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const itemInProductList = products
        .map((product) => product.title)
        .includes(formValues.title);

      if (itemInProductList) {
        throw new Error(
          `Cannot add new product of title '${formValues.title}'; existing product with that name already exists.`
        );
      }

      const addedProduct = await shopService.addProduct(formValues);

      setProducts([...products, addedProduct]);
      setFormValues({ title: "", price: "", quantity: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-form">
      <p>
        <button
          className="add-product-button"
          style={{ display: formDisplay.button ? "block" : "none" }}
          onClick={handleFormToggleClick}
        >
          Add A Product
        </button>
      </p>
      <form
        style={{ display: formDisplay.form ? "block" : "none" }}
        onSubmit={handleFormSubmit}
      >
        <h3>Add Product</h3>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            value={formValues.title}
            onChange={setField("title")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            value={formValues.price}
            onChange={setField("price")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            value={formValues.quantity}
            onChange={setField("quantity")}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={handleFormToggleClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
