import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onAttendance,
  onAdd
}) {
  return (
    <>
      <h2>Employees</h2>

      <button onClick={onAdd}><FaPlus /> Add Employee</button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => onEdit(emp)}><FaEdit />Edit</button>
                  <button onClick={() => onDelete(emp.id)}><FaTrash />Delete</button>
                  <button onClick={() => onAttendance(emp)}><FaEye />View Attendance</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeTable;
