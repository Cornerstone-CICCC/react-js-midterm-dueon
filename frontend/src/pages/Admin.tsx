import Inventory from "./admin/Inventory";
import Users from "./admin/Users";
import "./admin/AdminStyles.css";

const Admin = () => {
  return (
    <div>
      <Inventory />
      <Users />
    </div>
  );
};

export default Admin;
