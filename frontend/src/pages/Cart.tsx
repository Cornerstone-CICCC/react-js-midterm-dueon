import React, { useState, useEffect } from "react";
import { X, Trash2, Minus, Plus } from "lucide-react";
import axios from "axios";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3500/cart", {
        withCredentials: true,
      });
      if (res.data.success) setCartItems(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQty = async (id: string, q: number) => {
    if (q < 1) return;
    await axios.put(
      `http://localhost:3500/cart/${id}`,
      { quantity: q },
      { withCredentials: true }
    );
    fetchCart();
  };

  const remove = async (id: string) => {
    await axios.delete(`http://localhost:3500/cart/${id}`, {
      withCredentials: true,
    });
    fetchCart();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3500/payments/create-checkout-session",
        {
          cartItems: cartItems.map((item) => ({
            title: item.productId?.title,
            image: item.productId?.mainImg,
            price: item.productId?.price,
            quantity: item.quantity,
          })),
        },
        { withCredentials: true }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err: any) {
      console.error("--- Checkout Error Detail ---");
      if (err.response) {
        console.log("Data:", err.response.data);
        console.log("Status:", err.response.status);
      } else {
        console.log("Message:", err.message);
      }
      alert("Checkout failed. Check the console for details.");
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose}></div>
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <X className="close-btn" onClick={onClose} size={24} />
        </div>
        <div className="cart-items">
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.productId?.mainImg}
                  alt=""
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h4>{item.productId?.title}</h4>
                  <div className="cart-item-price">
                    ${Number(item.productId?.price).toLocaleString()}
                  </div>
                  <div className="quantity-control">
                    <button
                      onClick={() => changeQty(item._id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQty(item._id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <Trash2
                  className="delete-item"
                  onClick={() => remove(item._id)}
                  size={18}
                />
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="subtotal-row">
            <span>Subtotal</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
