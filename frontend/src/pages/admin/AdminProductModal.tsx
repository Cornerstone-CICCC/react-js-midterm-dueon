import React, { useState, useEffect } from "react";
import { HiOutlineX, HiOutlineCloudUpload } from "react-icons/hi";
import "./AdminStyles.css";

export interface ProductData {
  _id?: string;
  title: string;
  price: string;
  content: string;
  mainImg: string;
  category: string;
  stock: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductData) => void;
  initialData: ProductData | null;
}

const AdminProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ModalProps) => {
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    price: "",
    content: "",
    mainImg: "",
    category: "Men",
    stock: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        price: "",
        content: "",
        mainImg: "",
        category: "Men",
        stock: 0,
      });
    }
  }, [initialData, isOpen]);

  const handleMainImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, mainImg: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <div className="modal-header">
          <h2>{initialData ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="close-btn">
            <HiOutlineX />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="modal-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <div className="form-group">
              <label>Stock Count</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Product Title</label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Describe the product details..."
              required
            />
          </div>

          <div className="form-group">
            <label>Main Product Image</label>
            <div className="image-upload-wrapper">
              {formData.mainImg ? (
                <div className="image-preview">
                  <img src={formData.mainImg} alt="Main Preview" />
                  <button
                    type="button"
                    className="remove-img"
                    onClick={() => setFormData({ ...formData, mainImg: "" })}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <HiOutlineCloudUpload size={30} />
                  <span>Click to upload main image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImgChange}
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {initialData ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductModal;
