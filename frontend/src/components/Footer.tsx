import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "80px 50px",
        background: "#f9f9f9",
        borderTop: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "40px",
        }}
      >
        <div>
          <h4 style={{ marginBottom: "20px" }}>SHOP</h4>
          <p>New Arrivals</p>
          <p>Best Sellers</p>
        </div>
        <div>
          <h4 style={{ marginBottom: "20px" }}>HELP</h4>
          <p>Shipping</p>
          <p>Returns</p>
        </div>
        <div>
          <h4 style={{ marginBottom: "20px" }}>COMPANY</h4>
          <p>About Us</p>
          <p>Careers</p>
        </div>
        <div>
          <h4 style={{ marginBottom: "20px" }}>NEWSLETTER</h4>
          <input
            type="text"
            placeholder="EMAIL ADDRESS"
            style={{
              width: "100%",
              padding: "10px 0",
              border: "none",
              borderBottom: "1px solid #000",
              background: "none",
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
