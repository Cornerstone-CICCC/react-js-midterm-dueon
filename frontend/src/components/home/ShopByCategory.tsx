import cateImg1 from "../../assets/image (4).png";
import cateImg2 from "../../assets/image (5).png";
import cateImg3 from "../../assets/image (6).png";
import cateImg4 from "../../assets/image (7).png";
import cateImg5 from "../../assets/image (8).png";
import cateImg6 from "../../assets/image (9).png";

const ShopByCategory = () => {
  const categories = [
    { name: "SHIRTS", img: cateImg1 },
    { name: "DENIM", img: cateImg2 },
    { name: "TEES", img: cateImg3 },
    { name: "PANTS", img: cateImg4 },
    { name: "SWEATERS", img: cateImg5 },
    { name: "OUTERWEAR", img: cateImg6 },
  ];
  return (
    <section className="cat-section">
      <h2>Shop by Category</h2>
      <div className="cat-grid">
        {categories.map((c) => (
          <div key={c.name} className="cat-card">
            <img src={c.img} alt={c.name} className="cat-img" />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ShopByCategory;
