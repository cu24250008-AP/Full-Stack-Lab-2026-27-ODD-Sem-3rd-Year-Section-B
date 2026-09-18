import { useState } from "react";

function CheckoutForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully!");

    console.log({
      name,
      address,
      pincode,
      phone,
      payment
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      >
        <option value="">Select Payment Method</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>

      <button type="submit">Place Order</button>
    </form>
  );
}

export default CheckoutForm;