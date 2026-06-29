function UserTable({ users, handleEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 border">ID</th>
            <th className="px-4 py-3 border">First Name</th>
            <th className="px-4 py-3 border">Last Name</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Department</th>
            <th className="px-4 py-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center hover:bg-gray-100 transition"
                >
                  <td className="border px-4 py-3">{user.id}</td>
                  <td className="border px-4 py-3">{user.firstName}</td>
                  <td className="border px-4 py-3">{user.lastName}</td>
                  <td className="border px-4 py-3">{user.email}</td>
                  <td className="border px-4 py-3">{user.department}</td>

                  <td className="border px-4 py-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
      </table>
    </div>
  );
}

export default UserTable;