import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userRole = sessionStorage.getItem("role");
  if (userRole !== "admin") {
    alert("Access Denied. Admin privileges required.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
