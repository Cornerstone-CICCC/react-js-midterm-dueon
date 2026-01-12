import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const PageLayout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet /> {/** Where child route elements will appear */}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
