import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { product: product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav>
        <h1>Your Store</h1>

        <button onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cartCount})
        </button>
      </nav>

      {!showCart ? (
        <>
          <ProductList addToCart={addToCart} />
          <CheckoutForm />
        </>
      ) : (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;