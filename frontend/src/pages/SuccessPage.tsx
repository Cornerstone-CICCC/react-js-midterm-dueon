import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  useEffect(() => {
    localStorage.removeItem("cartItems");

    const clearServerCart = async () => {
      try {
        await axios.delete("http://localhost:3500/cart", {
          withCredentials: true,
        });
        console.log("Server cart successfully cleared.");
      } catch (error) {
        console.error("Failed to clear cart on server:", error);
      }
    };

    clearServerCart();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ fontSize: "3.5rem" }}>🎉</h1>
      <h1 style={{ marginBottom: "10px", color: "#1a1a1a" }}>
        Payment Successful!
      </h1>

      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "#4a4a4a" }}>
          Thank you for your purchase.
        </p>
        <p style={{ margin: "5px 0", color: "#717171" }}>
          Your order has been processed successfully and a confirmation email
          will be sent shortly.
        </p>
      </div>

      <Link to="/">
        <button
          style={{
            padding: "14px 28px",
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
