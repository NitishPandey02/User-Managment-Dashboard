function FilterPopup({ department, setDepartment }) {
  return (
    <div className="flex items-center gap-3 h-14 px-4 border border-gray-300 rounded-lg bg-white">
      <label className="font-semibold">Filter:</label>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="h-10 px-3 border border-gray-300 rounded-md outline-none"
      >
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
      </select>

      {department && (
        <button
          onClick={() => setDepartment("")}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default FilterPopup;