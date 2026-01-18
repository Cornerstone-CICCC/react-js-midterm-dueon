import React from "react";
import dualBanner1 from "../../assets/homeintro-2-1.png";
import dualBanner2 from "../../assets/homeintro-2-2.png";

const DualBanner = () => {
  const banners = [
    {
      img: dualBanner1,
      title: "Our Holiday Gift Picks",
      desc: "The best presents for everyone on your list.",
      link: "Read More",
    },
    {
      img: dualBanner2,
      title: "Cleaner Fashion",
      desc: "See the sustainability efforts behind each of our products.",
      link: "Learn More",
    },
  ];

  return (
    <section className="dual-section">
      <div className="dual-container">
        {banners.map((b, index) => (
          <div key={index} className="dual-card">
            <h3>{b.title}</h3>
            <div className="dual-img-wrapper">
              <img src={b.img} alt={b.title} />
            </div>
            <div className="dual-content">
              <p>{b.desc}</p>
              <a href="#" className="dual-link">
                <u>{b.link}</u>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DualBanner;
