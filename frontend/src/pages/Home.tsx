import React from "react";
import "../Home.css";
import Hero from "../components/home/Hero";
import ShopByCategory from "../components/home/ShopByCategory";
import BannerGrid from "../components/home/BannerGrid";
import Mission from "../components/home/Mission";
import Favorites from "../components/home/Favorites";
import Review from "../components/home/Review";
import DualBanner from "../components/home/DualBanner";
import Social from "../components/home/Social";
import Values from "../components/home/Values";

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <ShopByCategory />
      <BannerGrid />
      <Mission />
      <Favorites />
      <Review />
      <DualBanner />
      <Social />
      <Values />
    </div>
  );
};

export default Home;
