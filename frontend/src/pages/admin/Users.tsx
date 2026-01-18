import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  _id: string;
  username: string;
  email: string;
  joinedDate: string;
  role: string;
  status: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3500/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading)
    return <div className="admin-loading">Loading users data...</div>;

  return (
    <div className="admin-card">
      <div className="card-header">
        <h2>User Management</h2>
        <span className="user-count">Total: {users.length}</span>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="user-info">
                <div className="user-initial">
                  {user.username ? user.username[0].toUpperCase() : "?"}
                </div>
                <span>{user.username}</span>
              </td>
              <td>{user.email}</td>
              <td>
                {user.joinedDate
                  ? new Date(user.joinedDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <span className="role-tag">{user.role}</span>
              </td>
              <td>
                <span
                  className={`status-badge ${
                    user.status ? "active" : "inactive"
                  }`}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
