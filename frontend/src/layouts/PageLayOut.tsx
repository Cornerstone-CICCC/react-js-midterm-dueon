import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageLayout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
