import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineGift,
} from "react-icons/hi";
import type { ProductData } from "../../pages/admin/AdminProductModal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3500/product/${id}`);
        if (response.data && response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToBag = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Item added to bag!");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Please login first.");
      } else {
        console.error("Add to cart error:", error);
        alert("Failed to add item to bag.");
      }
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  const displayImage =
    product.mainImg ||
    product.image ||
    product.imgUrl ||
    "https://via.placeholder.com/600x800";

  return (
    <div className="product-detail-container">
      <div className="detail-left">
        <div className="single-image-container">
          <img src={displayImage} alt={product.title} />
        </div>
      </div>

      <div className="detail-right">
        <div className="product-info">
          <div>
            <p className="category-label">{product.category}</p>
            <h2>{product.title}</h2>
          </div>
          <div className="price">
            <span>${Number(product.price).toLocaleString()}</span>
          </div>
        </div>

        <button className="addBtn" onClick={handleAddToBag}>
          ADD TO BAG
        </button>

        <div className="delivery-info">
          <div className="info-item">
            <HiOutlineTruck size={24} />
            <div>
              <span className="info-title">Free Shipping</span>
              <p className="info-desc">On all U.S. orders over $100.</p>
            </div>
          </div>
          <div className="info-item">
            <HiOutlineRefresh size={24} />
            <div>
              <span className="info-title">Easy Returns</span>
              <p className="info-desc">
                Return within 30 days for a full refund.
              </p>
            </div>
          </div>
          <div className="info-item">
            <HiOutlineGift size={24} />
            <div>
              <span className="info-title">Send it as a Gift</span>
              <p className="info-desc">
                Add a personalized note during checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="product-explaining">
          <h4>Description</h4>
          <p className="info-desc">{product.content || product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
