import shopService from "../services/shopService";
import usdFormat from "../utils/currencyFormatter";

const EmptyCart = () => {
  return (
    <>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
    </>
  );
};

const NotEmptyCart = ({ cart }) => {
  const itemAttributes = ["title", "price", "quantity"];

  return (
    <table className="cart-items">
      <thead>
        <tr>
          {itemAttributes.map((attr) => (
            <th scope="col" key={attr}>
              {attr === "title"
                ? "Item"
                : attr[0].toUpperCase() + attr.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cart.map((entry) => (
          <tr key={entry.id}>
            {itemAttributes.map((attr) => {
              if (attr === "price") {
                return <td key={attr}>{usdFormat(entry[attr])}</td>;
              }

              return <td key={attr}>{entry[attr]}</td>;
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3" className="total">
            Total: &nbsp;
            {usdFormat(
              cart
                .map((item) => item.price * item.quantity)
                .reduce((accum, price) => accum + price)
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const Cart = ({ cart, setCart }) => {
  const emptyCart = !cart || cart.length === 0;

  const handleCheckoutClick = async (e) => {
    e.preventDefault();

    await shopService.checkoutCart();
    setCart(cart.filter((item) => item._id === ""));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {emptyCart ? (
        <EmptyCart />
      ) : (
        <NotEmptyCart cart={cart} setCart={setCart} />
      )}
      <div className="checkout-button">
        <button
          className="checkout"
          disabled={emptyCart}
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
