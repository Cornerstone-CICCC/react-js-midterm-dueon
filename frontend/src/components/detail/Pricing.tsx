import React from "react";

import {
  HiOutlineCube,
  HiOutlineChip,
  HiOutlineUserGroup,
  HiOutlineReceiptTax,
  HiOutlineTruck,
} from "react-icons/hi";

const Pricing = () => {

  const costs = [
    {
      label: "Materials",
      price: "$41.06",
      icon: <HiOutlineCube size={40} />,
    },
    {
      label: "Hardware",
      price: "$3.14",
      icon: <HiOutlineChip size={40} />,
    },
    {
      label: "Labor",
      price: "$23.75",
      icon: <HiOutlineUserGroup size={40} />,
    },
    {
      label: "Duties",
      price: "$10.33",
      icon: <HiOutlineReceiptTax size={40} />,
    },
    {
      label: "Transport",
      price: "$1.02",
      icon: <HiOutlineTruck size={40} />,
    },
  ];

  return (
    <section className="pricing-container">
      <h2>Transparent Pricing</h2>
      <p>
        We publish what it costs us to make every one of our products. There are
        a lot of costs space - but we believe you deserve to know what goes into
        making the products you love.
      </p>

      <div className="icon-wrapper">
        {costs.map((item) => (
          <div key={item.label} className="icon-card">
            <div
              className="icon-img"
              style={{
                marginBottom: "15px",
                color: "#333",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
              {item.label}
            </p>
            <p style={{ fontWeight: "600", fontSize: "16px" }}>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
