import HomeIntro1 from "../../assets/home-intro-1.png";
import HomeIntro2 from "../../assets/home-intro-2.png";
import HomeIntro3 from "../../assets/home-intro-3.png";

const BannerGrid = () => (
  <section className="banner-grid">
    <div className="banner-card">
      <img src={HomeIntro1} alt="New Arrivals" />
      <div className="banner-overlay">
        <h2>New Arrivals</h2>
        <button className="banner-btn">SHOP THE LATEST</button>
      </div>
    </div>
    <div className="banner-card">
      <img src={HomeIntro2} alt="Best Sellers" />
      <div className="banner-overlay">
        <h2>Best-Sellers</h2>
        <button className="banner-btn">SHOP FAVORITES</button>
      </div>
    </div>
    <div className="banner-card">
      <img src={HomeIntro3} alt="Holiday" />
      <div className="banner-overlay">
        <h2>The Holiday Outfit</h2>
        <button className="banner-btn">SHOP LOOKS</button>
      </div>
    </div>
  </section>
);
export default BannerGrid;
