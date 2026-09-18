function Cart({ cart, removeFromCart }) {
  const grandTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.product.id}>
          <h3>{item.product.name}</h3>

          <p>Price: ₹{item.product.price}</p>

          <p>Quantity: {item.quantity}</p>

          <p>
            Subtotal: ₹{item.product.price * item.quantity}
          </p>

          <button onClick={() => removeFromCart(item.product.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Grand Total: ₹{grandTotal}</h2>
    </div>
  );
}

export default Cart;