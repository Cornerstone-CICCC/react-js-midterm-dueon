import React from "react";
import "../Detail.css";
import ProductDetail from "../components/detail/ProductDetail";
import PoroductRecommend from "../components/detail/PoroductRecommend";
import ProductReviews from "../components/detail/ProductReviews";
import Pricing from "../components/detail/Pricing";

const Detail = () => {
  return (
    <>
      <ProductDetail />
      <PoroductRecommend />
      <ProductReviews />
      <Pricing />
    </>
  );
};

export default Detail;
