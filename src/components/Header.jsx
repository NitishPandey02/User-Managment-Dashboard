function Header({ totalUsers, filteredUsers, totalDepartments }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        User Management Dashboard
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Manage users with Search, Filter, Sort & CRUD operations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">Filtered Users</h3>
          <p className="text-3xl font-bold">{filteredUsers}</p>
        </div>

        <div className="bg-purple-500 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">Departments</h3>
          <p className="text-3xl font-bold">{totalDepartments}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;