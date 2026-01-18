import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Home.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currPassword: "",
    newPassword: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get("/users/check-auth");
      setUser(response.data);

      if (response.data.role) {
        sessionStorage.setItem("role", response.data.role);
      }

      setFormData({
        username: response.data.username,
        email: response.data.email,
        currPassword: "",
        newPassword: "",
      });
    } catch (err) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currPassword || !formData.newPassword) {
      alert("Please enter both current and new passwords to update.");
      return;
    }

    try {
      const response = await axios.put("/users/profile", formData);
      alert(response.data.message);
      setIsEditing(false);
      fetchUser();
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      const response = await axios.delete("/users/delete");
      alert(response.data.message);
      sessionStorage.clear();
      window.location.href = "/";
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete account failed.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout");
      sessionStorage.clear();
      window.location.href = "/";
    } catch (err) {
      alert("Logout failed.");
    }
  };

  if (loading) return <div className="auth-wrapper">Loading...</div>;

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>My Profile</h2>
        <p>You can update your password below.</p>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="profile-edit-form">
            <div className="info-item">
              <label>Username (Fixed)</label>
              <input
                type="text"
                className="auth-input readonly-input"
                value={formData.username}
                readOnly
              />
            </div>
            <div className="info-item">
              <label>Email Address (Fixed)</label>
              <input
                type="email"
                className="auth-input readonly-input"
                value={formData.email}
                readOnly
              />
            </div>

            <div style={{ margin: "20px 0", borderTop: "1px solid #eee" }} />

            <div className="info-item">
              <label>Current Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Required to verify"
                value={formData.currPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currPassword: e.target.value })
                }
                required
              />
            </div>
            <div className="info-item">
              <label>New Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="auth-submit-btn">
                UPDATE PASSWORD
              </button>
              <button
                type="button"
                className="auth-submit-btn"
                onClick={() => setIsEditing(false)}
                style={{
                  background: "#f5f5f5",
                  color: "#000",
                  marginTop: "10px",
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-info-card">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user?.username}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="auth-submit-btn"
                onClick={() => setIsEditing(true)}
              >
                CHANGE PASSWORD
              </button>
              <button
                className="auth-submit-btn"
                onClick={handleLogout}
                style={{
                  margin: "10px 0",
                  background: "#1a1a1a",
                  color: "#fff",
                }}
              >
                LOG OUT
              </button>
              <button
                className="auth-submit-btn"
                onClick={handleDeleteAccount}
                style={{ background: "#d93025", color: "#fff" }}
              >
                DELETE ACCOUNT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
