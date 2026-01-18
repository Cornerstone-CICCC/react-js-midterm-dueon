import React, { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import axios from "axios";

const Social = () => {
  const [socialImages, setSocialImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3500/product");
        if (response.data && response.data.success) {
          setSocialImages(response.data.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch social images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialImages();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (socialImages.length === 0) return null;

  return (
    <section className="social-section">
      <div className="social-header">
        <h2>Everlane On You</h2>
        <p>#EverlaneOnYou</p>
      </div>
      <div className="social-grid">
        {socialImages.map((item) => (
          <div key={item._id} className="social-img-wrapper">
            <img
              src={item.mainImg}
              alt="Social Styling"
              className="social-img-tag"
            />
            <div className="social-overlay">
              <Instagram className="insta-icon" size={24} color="white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Social;
