import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState<any[]>([]); // DB 데이터를 담을 상태
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3500/product");
        if (response.data && response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch favorite products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (current < products.length - 4) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) return <div className="loading">Loading favorites...</div>;
  if (products.length === 0) return null;

  return (
    <section className="fav-section">
      <div className="fav-header">
        <h2>Everlane Favorites</h2>
        <p>
          Beautifully Functional. Purposefully Designed. Consciously Crafted.
        </p>
      </div>

      <div className="fav-slider-outer">
        <button
          className="nav-btn prev"
          onClick={prevSlide}
          style={{ visibility: current === 0 ? "hidden" : "visible" }}
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </button>

        <div className="fav-slider-container">
          <div
            className="fav-track"
            style={{
              transform: `translateX(-${current * (100 / 4)}%)`,
              display: "flex",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {products.map((p) => (
              <div
                key={p._id}
                className="fav-item"
                style={{ flex: "0 0 25%", cursor: "pointer" }}
                onClick={() => navigate(`/product/${p._id}`)} // 클릭 시 상세페이지 이동
              >
                <div className="fav-img-wrapper">
                  <img src={p.mainImg} alt={p.title} className="fav-img-tag" />
                </div>
                <div className="fav-info">
                  <span className="p-name">{p.title}</span>
                  <span className="p-price">
                    ${Number(p.price).toLocaleString()}
                  </span>
                </div>
                <div className="color-name">{p.category}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-btn next"
          onClick={nextSlide}
          style={{
            visibility: current >= products.length - 4 ? "hidden" : "visible",
          }}
        >
          <ChevronRight size={40} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
};

export default Favorites;
