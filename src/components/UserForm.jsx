function UserForm({
  formData,
  setFormData,
  handleSubmit,
  editingUser,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({
              ...formData,
              firstName: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({
              ...formData,
              lastName: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;