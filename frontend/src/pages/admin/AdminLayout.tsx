import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HiOutlineCube, HiOutlineUsers, HiOutlineLogout } from "react-icons/hi";
import "./AdminStyles.css";

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">EVERLANE ADMIN</div>
        <nav>
          <ul>
            <li className={pathname.includes("inventory") ? "active" : ""}>
              <Link to="/admin/inventory">
                <HiOutlineCube /> <span>Inventory</span>
              </Link>
            </li>
            <li className={pathname.includes("users") ? "active" : ""}>
              <Link to="/admin/users">
                <HiOutlineUsers /> <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="admin-logout">
          <HiOutlineLogout /> <span>Logout</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="page-title">
            Dashboard / {pathname.split("/").pop()}
          </div>
          <div className="admin-profile">
            <span>
              Welcome, <strong>Manager</strong>
            </span>
            <div className="admin-avatar">AD</div>
          </div>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
