import reviewImg from "../../assets/homeproduct-review.png";

const Review = () => (
  <section className="review-box">
    <div className="review-content">
      <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
      <h2>
        "Love this shirt! Fits perfectly and the fabric is substantial without
        being stiff."
      </h2>
      <p>- Verified Customer</p>
    </div>
    <img src={reviewImg} alt="Review" className="review-img-tag" />
  </section>
);
export default Review;
