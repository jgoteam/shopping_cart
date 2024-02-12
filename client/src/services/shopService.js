const API_BASE_URL = "http://localhost:5001/api";

const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return await response.json();
};

const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  return await response.json();
};

const addProduct = async (formValues) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  return await response.json();
};

const deleteProduct = async (productId) => {
  await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
  });
};

const editProduct = async (productId, updatedProductValues) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProductValues),
  });

  return await response.json();
};

const addProductToCart = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return await response.json();
};

const checkoutCart = async () => {
  await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
  });

};

// Adding Product, Deleting Product, Editing Product, Adding Product to the cart and Cart Checkout

export default {
  getAllProducts,
  getCart,
  addProduct,
  deleteProduct,
  editProduct,
  addProductToCart,
  checkoutCart,
};
