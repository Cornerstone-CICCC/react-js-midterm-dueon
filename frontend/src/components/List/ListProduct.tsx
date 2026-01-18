import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { ProductData } from "../../pages/admin/AdminProductModal";

const ListProduct = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3500/product");

        if (response.data && response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="productListContainer">
      <div className="list-header">
        <p className="breadcrumb">Home / {category}</p>
        <h2 style={{ textTransform: "capitalize" }}>
          {category}'s Clothing & Apparel - New Arrivals
        </h2>
        <p className="featured-text">Featured</p>
      </div>

      <div className="productList">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="card"
            >
              <div className="image-wrapper">
                <img
                  src={product.mainImg}
                  alt={product.title}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/400x500")
                  }
                />
              </div>
              <div className="product-info">
                <span className="product-title">{product.title}</span>
                <span className="product-price">
                  ${Number(product.price).toLocaleString()}
                </span>
              </div>
              <p className="product-color-text">{product.category}</p>
            </Link>
          ))
        ) : (
          <div className="no-products">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
