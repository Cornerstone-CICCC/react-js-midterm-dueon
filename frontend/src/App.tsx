import { Routes, Route } from "react-router";
import PageLayout from "./layouts/PageLayOut";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Login from "./pages/auth/Login";
import List from "./pages/List";
import SignUp from "./pages/auth/Signup";
import AdminLayout from "./pages/admin/AdminLayout";
import Inventory from "./pages/admin/Inventory";
import Users from "./pages/admin/Users";
import Profile from "./pages/auth/Profile";
import AdminRoute from "./AdminRoute";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/list/:category" element={<List />} />{" "}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<SuccessPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Inventory />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="users" element={<Users />} />
          <Route path="reviews" element={<Admin />} />{" "}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
