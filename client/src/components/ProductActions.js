import { useState } from "react";
import EditForm from "./EditForm";
import shopService from "../services/shopService";

const ProductActions = ({
  product,
  setProduct,
  cart,
  setCart,
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditFormDisplay(!editFormDisplay);
  };

  const handleAddClick = async (e) => {
    e.preventDefault();

    if (product.quantity === 0) {
      return;
    }

    try {
      const { item: newItem, product: updatedProduct } =
        await shopService.addProductToCart(product._id);
      const itemInCart = cart.map((item) => item._id).includes(newItem._id);

      setCart(
        itemInCart
          ? cart.map((item) => {
              if (item._id == newItem._id) {
                item.quantity = newItem.quantity;
              }

              return item;
            })
          : [...cart, newItem]
      );
      setProduct({ ...product, quantity: updatedProduct.quantity });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="actions product-actions">
        <button className="add-to-cart" onClick={handleAddClick}>
          Add to Cart
        </button>
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
    </>
  );
};

export default ProductActions;
