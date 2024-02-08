import data from "./mockData/data";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5001/api";

const Cart = ({ cartItems }) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <i>No items in cart</i>
      </div>
    );
  }

  const itemAttributes = ["title", "quantity", "price"];

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            {itemAttributes.map((key) => (
              <th scope="col" key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((entry) => {
            return (
              <tr key={entry.id}>
                {itemAttributes.map((attr) => (
                  <td key={attr}>{entry[attr]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">
              Total:
              {cartItems
                .map((item) => item.price)
                .reduce((accum, price) => accum + price)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  const [thisProduct, setThisProduct] = useState(product);
  const [editFormDisplay, setEditFormDisplay] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditFormDisplay(!editFormDisplay);
  }

  return (
    <li key={thisProduct.id} className="product">
      <div className="product-details">
        <h3>{thisProduct.title}</h3>
        <p className="price">{thisProduct.price}</p>
        <p className="quantity">{thisProduct.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={handleEditClick}>Edit</button>
          { editFormDisplay ? <EditForm product={thisProduct} setThisProduct={setThisProduct} setEditFormDisplay={setEditFormDisplay} /> : null }
        </div>
        <button className="delete-button">
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

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

const EditForm = ({ product, setThisProduct, setEditFormDisplay }) => {
  const [formValues, setFormValues] = useState(product);

  const setField = (field) => {
    return ({ target: { value } }) => {
      setFormValues({ ...formValues, [field]: value });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (data) {
        console.log("Product updated successfully");
        setThisProduct({ ...product, ...data});
        setEditFormDisplay(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          <button type="button" onClick={() => setEditFormDisplay(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const AddForm = () => {
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
      await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      console.log("Product added successfully");
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

const App = () => {
  const [products, setProducts] = useState([]);

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
      <header>
        <h1>The Shop!</h1>
        <Cart cartItems={[]} />
      </header>
      <main>
        <ProductList list={products} />
        <AddForm />
      </main>
    </div>
  );
};

export default App;
