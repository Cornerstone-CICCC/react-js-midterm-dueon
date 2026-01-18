import React, { useState, useEffect } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import AdminProductModal, { type ProductData } from "./AdminProductModal";
import axios from "axios";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3500/product/${id}`);
        alert("Product deleted successfully.");
        fetchProducts();
      } catch (error) {
        alert("An error occurred during deletion.");
      }
    }
  };

  const handleSave = async (data: ProductData) => {
    try {
      const targetId = selectedProduct?._id;

      if (targetId && String(targetId) !== "NaN") {
        await axios.put(`http://localhost:3500/product/${targetId}`, data);
        alert("Product updated successfully.");
      } else {
        const { _id, ...postData } = data;
        await axios.post("http://localhost:3500/product", postData);
        alert("Product registered successfully.");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error: any) {
      console.error("Save failed:", error);
      alert(error.response?.data?.message || "Failed to save product.");
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: ProductData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) return <div className="admin-loading">Loading Inventory...</div>;

  return (
    <div className="admin-card">
      <div className="card-header">
        <h2>Product Inventory ({products.length})</h2>
        <button className="add-btn" onClick={handleAddClick}>
          <HiOutlinePlus /> Add Product
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="table-img-container">
                    <img
                      src={p.mainImg}
                      alt={p.title}
                      className="table-img"
                      onError={(e) =>
                        (e.currentTarget.src = "https://via.placeholder.com/50")
                      }
                    />
                  </div>
                </td>
                <td className="product-title">{p.title}</td>
                <td>{p.category}</td>
                <td>${Number(p.price).toLocaleString()}</td>
                <td>{p.stock}</td>
                <td className="actions">
                  <button
                    className="edit-icon"
                    onClick={() => handleEditClick(p)}
                  >
                    <HiOutlinePencil />
                  </button>
                  <button
                    className="delete-icon"
                    onClick={() => p._id && handleDelete(p._id)}
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{ textAlign: "center", padding: "40px", color: "#999" }}
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AdminProductModal
        key={
          isModalOpen
            ? selectedProduct?._id
              ? String(selectedProduct._id)
              : "new"
            : "closed"
        }
        isOpen={isModalOpen}
        initialData={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default Inventory;
