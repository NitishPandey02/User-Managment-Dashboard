import { useState, useMemo, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserForm from "./components/UserForm";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import useUsers from "./hooks/useUsers";
import Header from "./components/Header";
import { createUser, updateUser, deleteUser } from "./api/userService";

function App() {
  const { users, setUsers, loading, error } = useUsers();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department]);

  // FILTER
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        department === "" || user.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [users, search, department]);

  // SORT
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );
  }, [filteredUsers, sortOrder]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(sortedUsers.length / itemsPerPage)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginatedUsers = sortedUsers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // SUBMIT (ADD / EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, department } = formData;

      if (!firstName.trim()) {
        alert("First Name is required");
        return;
      }

      if (!lastName.trim()) {
        alert("Last Name is required");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email");
        return;
      }

      if (!department.trim()) {
        alert("Department is required");
        return;
      }
    

    try {
      if (editingUser) {
         setUsers((prev) =>
         prev.map((user) =>
         user.id === editingUser.id
         ? { ...user, ...formData }
         : user
      )
    );

    setEditingUser(null);
  } else {
        const response = await createUser(formData);

        const newUser = {
          id: response.data.id || Date.now(),
          ...response.data,
        };

        setUsers((prev) => [...prev, newUser]);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } catch (err) {
        console.error(err);
        console.error(err.response);
        alert(err.message);
      }
  };

  // EDIT
  const handleEdit = (user) => {
    setEditingUser(user);

    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      alert("Delete Failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

    return (
     <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">User Management Dashboard</h1>

          <p className="text-center text-gray-500 mt-2 mb-8">Total Users: {sortedUsers.length}</p>
          <div className="flex justify-center items-center gap-4 mb-8 flex wrap">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <FilterPopup
              department={department}
              setDepartment={setDepartment}
            />

            <button
              onClick={() =>
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
              className="h-14 bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
            >
              Sort {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>

          <UserForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            editingUser={editingUser}
          />


          <UserTable
            users={paginatedUsers}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          {/* PAGINATION */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  ← Previous
                </button>

                <span className="font-semibold text-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>  
      </div>  
  );
}

export default App;