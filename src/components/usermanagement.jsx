import React, { useState, useEffect } from "react";
import axios from "axios";

function Usermanagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isEditUserOpen, setEditUserOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  // ---------------------------------------------------------------------------

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // --------------------------------------------------------------------------

  const handleCreateUser = async () => {
    const emailExists = users.some(
      (existingUser) => existingUser.email === newUser.email
    );
    const employeeNumberExists = users.find(
      (existingUser) => existingUser.employeeNumber === newUser.employeeNumber
    );
    if (emailExists) {
      alert("Email already exists. Please use a different email.");
      return;
    }
    if (employeeNumberExists) {
      alert(
        "Employee number already exists. Please use a different employee number."
      );
      return;
    }
    if (newUser.manager === newUser.name && newUser.position !== "CEO") {
      alert("User can't be their own manager.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        newUser
      );
      setUsers([...users, response.data]);
      setNewUser({});
      setCreateUserOpen(false);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  // --------------------------------------------------------------------------

  const handleUpdateUser = async () => {
    const existingUser = users.find((user) => user._id === editUser._id);

    const emailChanged = existingUser.email !== editUser.email;
    const employeeNumberChanged =
      existingUser.employeeNumber !== editUser.employeeNumber;

    if (editUser.manager === editUser.name && editUser.position !== "CEO") {
      alert("User can't be their own manager.");
      return;
    }

    if (emailChanged) {
      const emailExists = users.some((user) => user.email === editUser.email);
      if (emailExists) {
        alert("Updated email already exists. Please use a different email.");
        return;
      }
    }

    if (employeeNumberChanged) {
      const employeeNumberExists = users.some(
        (user) => user.employeeNumber === editUser.employeeNumber
      );
      if (employeeNumberExists) {
        alert(
          "Updated employee number already exists. Please use a different employee number."
        );
        return;
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${editUser._id}`,
        editUser
      );
      const updatedUsers = users.map((user) =>
        user._id === response.data._id ? response.data : user
      );
      setUsers(updatedUsers);
      setEditUser(null);
      setEditUserOpen(false);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  // --------------------------------------------------------------------------

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${deleteUser._id}`);
      const updatedUsers = users.filter((user) => user._id !== deleteUser._id);
      setUsers(updatedUsers);
      setDeleteUser(null);
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // --------------------------------------------------------------------------

  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // --------------------------------------------------------------------------

  const handleSearch = () => {
    const newFilteredUsers = users.filter((user) => {
      switch (selectedFilter) {
        case "email":
          return user.email.toLowerCase().includes(searchInput.toLowerCase());
        case "name":
          return (user.name + " " + user.surname)
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        case "birthDate":
          return user.birthDate
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        case "employeeNumber":
          return (user.employeeNumber + " " + user.employeeNumber)
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        case "position":
          return (user.position + " " + user.position)
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        case "manager":
          return (user.manager + " " + user.manager)
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        default:
          return Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(searchInput.toLowerCase())
          );
      }
    });

    setFilteredUsers(newFilteredUsers);
  };

  // --------------------------------------------------------------------------

  const clearSearch = () => {
    setSearchInput("");
    setSelectedFilter("all");
    setFilteredUsers([]);
  };

  // --------------------------------------------------------------------------

  return (
    <>
      <div className="user-management">
        <div className="user-management-container">
          <h2 className="user-management-header">Employee Management</h2>
          {isCreateUserOpen && (
            <div
              className="add-user-container"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1e1e1e88",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="add-user-container-inner">
                <div className="add-user-inner-container">
                  <h3 className="add-user-heading">Add an Employee</h3>
                  <div className="add-input-container">
                    <p>Name</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={newUser.name || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                    <p>Surname</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Surname"
                      value={newUser.surname || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, surname: e.target.value })
                      }
                    />
                    <p>Email</p>
                    <input
                      className="edit-input-style"
                      type="email"
                      placeholder="Email"
                      value={newUser.email || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                    <p>Password</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Password"
                      value={newUser.password || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                    />
                    <p>Date of Birth</p>
                    <input
                      className="edit-input-style"
                      type="date"
                      placeholder="Date of Birth"
                      value={newUser.birthDate || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, birthDate: e.target.value })
                      }
                    />
                    <p>Employee Number</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Employee Number"
                      value={newUser.employeeNumber || ""}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          employeeNumber: e.target.value,
                        })
                      }
                    />
                    <p>Salary</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Salary"
                      value={newUser.salary || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, salary: e.target.value })
                      }
                    />
                    <p>Position</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Position"
                      value={newUser.position || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, position: e.target.value })
                      }
                    />
                    <p>Manager</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Manager"
                      value={newUser.manager || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, manager: e.target.value })
                      }
                    />

                    <div className="add-user-button-container">
                      <button
                        className="add-user-button"
                        onClick={handleCreateUser}
                      >
                        Create User
                      </button>
                      <button
                        className="add-user-button2"
                        onClick={() => setCreateUserOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isDeleteConfirmationOpen && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3>Confirm Deletion</h3>
              <p>
                Are you sure you want to delete{" "}
                {deleteUser ? deleteUser.name : "this user"}?
              </p>
              <button onClick={handleDeleteUser}>Yes</button>
              <button onClick={() => setDeleteConfirmationOpen(false)}>
                No
              </button>
            </div>
          )}
          <div className="search-container">
            <div className="search-inner-container">
              <div className="container-left1">
                <div className="create-user-container">
                  <button
                    className="create-user-button"
                    onClick={() => setCreateUserOpen(true)}
                  >
                    Add an Employee
                  </button>
                </div>
              </div>
              <div className="container-right1">
                <div className="search-icon-container">
                  <img src="search.svg" alt="" />
                </div>
                <input
                  className="user-search"
                  type="text"
                  placeholder="Search employees"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <select
                  className="select-style"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Fields</option>
                  <option value="name">Name</option>
                  <option value="surname">Surname</option>
                  <option value="email">Email</option>
                  <option value="birthDate">Birth Date</option>
                  <option value="employeeNumber">EN</option>
                  <option value="position">Position</option>
                  <option value="manager">Manager</option>
                </select>
                <button className="search-button-styles" onClick={handleSearch}>
                  Search
                </button>
                <button className="search-button-styles2" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            </div>
          </div>
          <div className="user-table">
            <h3 className="user-table-header">Employees</h3>
            <table className="table-style">
              <thead className="table-head">
                <tr className="table-row-padding">
                  <th className="th-odd">Name</th>
                  <th className="th-even">Surname</th>
                  <th className="th-odd">Email</th>
                  <th className="th-even">Password</th>
                  <th className="th-odd">Birth Date</th>
                  <th className="th-even">EN</th>
                  <th className="th-odd">Salary</th>
                  <th className="th-even">Position</th>
                  <th className="th-even">Manager</th>
                  <th className="th-odd">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0
                  ? filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="table-data-center">{user.name}</td>
                        <td className="table-data-center">{user.surname}</td>
                        <td className="table-data-center">{user.email}</td>
                        <td className="table-data-center">{user.password}</td>
                        <td className="table-data-center">
                          {user.birthDate &&
                            new Date(user.birthDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                        </td>
                        <td className="table-data-center">
                          {user.employeeNumber}
                        </td>
                        <td className="table-data-center">{user.salary}</td>
                        <td className="table-data-center">{user.position}</td>
                        <td className="table-data-center">{user.manager}</td>
                        <td className="table-data-center">
                          <button
                            className="edit-button"
                            onClick={() => {
                              setEditUser(user);
                              setEditUserOpen(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => {
                              setDeleteUser(user);
                              setDeleteConfirmationOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : users.map((user) => (
                      <tr key={user._id}>
                        <td className="table-data-center">{user.name}</td>
                        <td className="table-data-center">{user.surname}</td>
                        <td className="table-data-center">{user.email}</td>
                        <td className="table-data-center">{user.password}</td>
                        <td className="table-data-center">
                          {user.birthDate &&
                            new Date(user.birthDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                        </td>
                        <td
                          className="table-data-center table-data-width
                  "
                        >
                          {user.employeeNumber}
                        </td>
                        <td className="table-data-center">R {user.salary}</td>
                        <td className="table-data-center">{user.position}</td>
                        <td className="table-data-center">{user.manager}</td>
                        <td className="table-data-center">
                          <button
                            className="edit-button"
                            onClick={() => {
                              setEditUser(user);
                              setEditUserOpen(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => {
                              setDeleteUser(user);
                              setDeleteConfirmationOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          {isEditUserOpen && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: "100vh",
                width: "100vw",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1e1e1e88",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="edit-user-inner-container">
                <div className="edit-container">
                  <h3 className="edit-user-heading">Update Employee</h3>
                  <div className="edit-input-container">
                    <p>Email</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Email"
                      value={editUser.email || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, email: e.target.value })
                      }
                    />
                    <p>Name</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={editUser.name || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, name: e.target.value })
                      }
                    />
                    <p>Surname</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={editUser.surname || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, surname: e.target.value })
                      }
                    />
                    <p>Date of Birth</p>
                    <input
                      className="edit-input-style"
                      type="date"
                      placeholder="Name"
                      value={editUser.birthDate || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, birthDate: e.target.value })
                      }
                    />
                    <p>Employee Number</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={editUser.employeeNumber || ""}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          employeeNumber: e.target.value,
                        })
                      }
                    />
                    <p>Salary</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={editUser.salary || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, salary: e.target.value })
                      }
                    />
                    <p>Position</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Position"
                      value={editUser.position || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, position: e.target.value })
                      }
                    />
                    <p>Manager</p>
                    <input
                      className="edit-input-style"
                      type="text"
                      placeholder="Name"
                      value={editUser.manager || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, manager: e.target.value })
                      }
                    />
                    <button
                      className="edit-user-button"
                      onClick={handleUpdateUser}
                    >
                      Update Employee Details
                    </button>
                    <button
                      className="edit-user-button2"
                      onClick={() => setEditUserOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Usermanagement;
