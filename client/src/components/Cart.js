const EmptyCart = () => {
  return (
    <>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
    </>
  );
};

const NotEmptyCart = ({ cartItems }) => {
  const itemAttributes = ["id", "title", "price", "quantity"];

  return (
    <table className="cart-items">
      <thead>
        <tr>
          {itemAttributes.map((attr) => (
            <th scope="col" key={attr}>
              {attr}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cartItems.map((entry) => (
          <tr key={entry.id}>
            {itemAttributes.map((attr) => (
              <td key={attr}>{entry[attr]}</td>
            ))}
          </tr>
        ))}
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
  );
};

const Cart = ({ cartItems }) => {
  const emptyCart = !cartItems || cartItems.length === 0;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {emptyCart ? <EmptyCart /> : <NotEmptyCart {...cartItems} />}
      <div className="checkout-button">
        <button className="checkout" disabled={emptyCart}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
