import bgi from "../../assets/homeProductbgimg.png";

const Mission = () => (
  <section className="mission">
    <img src={bgi} alt="Mission Background" className="mission-img" />
    <div className="mission-content">
      <h2>We're on a Mission To Clean Up the Industry</h2>
      <button className="mission-btn">LEARN MORE</button>
    </div>
  </section>
);
export default Mission;
