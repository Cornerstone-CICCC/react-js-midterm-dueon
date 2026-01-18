import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductRecommend = () => {
  const [recommends, setRecommends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommends = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3500/product");
        if (response.data && response.data.success) {
          // 데이터 중 앞의 4개만 추천 상품으로 사용
          setRecommends(response.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch recommended products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommends();
  }, []);

  if (loading) return <div className="loading">Loading recommendations...</div>;
  if (recommends.length === 0) return null;

  return (
    <section className="detailProductList">
      <div className="section-header">
        <h2>You Might Also Like</h2>
      </div>
      <div className="slider-container">
        <button className="nav-btn prev">❮</button>
        <div className="wrapper">
          <div className="slider-inner">
            {recommends.map((item) => (
              <div
                key={item._id}
                className="detailProduct-card"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  window.scrollTo(0, 0); // 상세 이동 시 페이지 상단으로 이동
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="img-box">
                  <img src={item.mainImg} alt={item.title} />
                </div>
                <div className="product-info">
                  <div className="info-top">
                    <span className="p-name">{item.title}</span>
                    <span className="p-price">
                      ${Number(item.price).toLocaleString()}
                    </span>
                  </div>
                  <p className="color">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="nav-btn next">❯</button>
      </div>
    </section>
  );
};

export default ProductRecommend;
