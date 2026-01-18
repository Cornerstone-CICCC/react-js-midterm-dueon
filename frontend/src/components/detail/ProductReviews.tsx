import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, Trash2, Edit2 } from "lucide-react";

const ProductReviews = () => {
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
  });

  const currentUserId = sessionStorage.getItem("userId");
  const currentUsername =
    sessionStorage.getItem("username") || sessionStorage.getItem("userName");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3500/review/${productId}`);
      if (res.data.success) setReviews(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3500/review/${editingId}`,
          newReview,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `http://localhost:3500/review`,
          {
            ...newReview,
            productId,
            userName: currentUsername,
            userId: currentUserId,
          },
          { withCredentials: true }
        );
      }
      resetForm();
      fetchReviews();
    } catch (error) {
      alert("Action failed.");
    }
  };

  const resetForm = () => {
    setNewReview({ title: "", content: "", rating: 5 });
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleEdit = (review: any) => {
    setNewReview({
      title: review.title,
      content: review.content,
      rating: review.rating,
    });
    setEditingId(review._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`http://localhost:3500/review/${reviewId}`, {
        withCredentials: true,
      });
      fetchReviews();
    } catch (e) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="review-section">
      <div className="review-header-container">
        <h3 className="review-header">Reviews ({reviews.length})</h3>
        <button
          className="write-toggle-btn"
          onClick={() => (isFormOpen ? resetForm() : setIsFormOpen(true))}
        >
          {isFormOpen ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {isFormOpen && (
        <div className="review-form-box">
          <h4 className="form-title">
            {editingId ? "EDIT REVIEW" : "WRITE A REVIEW"}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={20}
                  fill={num <= newReview.rating ? "#000" : "none"}
                  stroke="#000"
                  onClick={() => setNewReview({ ...newReview, rating: num })}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Review Title"
              value={newReview.title}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              required
              className="review-input"
            />
            <textarea
              placeholder="Share your thoughts..."
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              required
              className="review-textarea"
            />
            <button type="submit" className="submit-review-btn">
              {editingId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {!isFormOpen && (
        <div className="review-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            reviews.map((review) => {
              const reviewUser = review.userName || review.username;
              const isOwner =
                currentUsername === reviewUser ||
                currentUserId === review.userId;

              return (
                <div key={review._id} className="review-card">
                  <div className="review-left">
                    <span className="cusname">{reviewUser}</span>
                    {isOwner && (
                      <div className="action-btns">
                        <button
                          onClick={() => handleEdit(review)}
                          className="edit-icon-btn"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="delete-icon-btn"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="review-right">
                    <div className="stars">{"⭐️".repeat(review.rating)}</div>
                    <h4 className="review-title">{review.title}</h4>
                    <p className="review-content">{review.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
