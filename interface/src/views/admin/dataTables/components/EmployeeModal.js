import { color } from "framer-motion";

function EmployeeModal({ show, onClose, onSubmit, editEmployee }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onSubmit({
              name: e.target.name.value,
              email: e.target.email.value,
              department: e.target.department.value
            });
          }}
        >
          <h3>{editEmployee ? "Edit Employee Details:" : "Add Employee"}</h3>

          <input
            name="name"
            defaultValue={editEmployee?.name || ""}
            placeholder="Name"
            required
          />

          <input
            name="email"
            defaultValue={editEmployee?.email || ""}
            placeholder="Email"
            required
          />

          <input
            name="department"
            defaultValue={editEmployee?.department || ""}
            placeholder="Department"
          />

          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;