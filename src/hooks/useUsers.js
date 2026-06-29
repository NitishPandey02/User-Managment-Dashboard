import { useEffect, useState } from "react";
import { getUsers } from "../api/userService";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      const mappedUsers = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: user.email,
          department: "IT",
        };
      });

      setUsers(mappedUsers);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    setUsers,
    loading,
    error,
  };
}

export default useUsers;