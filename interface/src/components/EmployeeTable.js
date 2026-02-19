import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaUserClock, FaPlus, FaSort } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onAttendance,
  onAdd
}) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // 🔎 Filter + Sort logic
  const filteredEmployees = useMemo(() => {
    let filtered = employees.filter((emp) =>
      Object.values(emp)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (sortField) {
      filtered.sort((a, b) => {
        if (a[sortField] < b[sortField])
          return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [employees, search, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <h2>Employees</h2>
      <div className="table-actions">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: "10px", padding: "5px", width: "auto" }}
        />

        <button
          data-tooltip-id="addTip"
          data-tooltip-content="Add Employee"
          data-tooltip-place="bottom"
          onClick={onAdd}
        >
          <FaPlus /> Add Employee
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("employee_id")}>
                ID <FaSort />
              </th>
              <th onClick={() => handleSort("name")}>
                Name <FaSort />
              </th>
              <th onClick={() => handleSort("email")}>
                Email <FaSort />
              </th>
              <th onClick={() => handleSort("department")}>
                Department <FaSort />
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    data-tooltip-id="editTip"
                    data-tooltip-content="Edit Employee"
                    data-tooltip-place="bottom"
                    onClick={() => onEdit(emp)}
                    style={{ color: "blue" }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    data-tooltip-id="deleteTip"
                    data-tooltip-content="Delete Employee"
                    data-tooltip-place="bottom"
                    onClick={() => onDelete(emp.id)}
                    style={{ color: "red" }}
                  >
                    <FaTrash />
                  </button>

                  <button
                    data-tooltip-id="attendanceTip"
                    data-tooltip-content="View Attendance"
                    data-tooltip-place="bottom"
                    onClick={() => onAttendance(emp)}
                  >
                    <FaUserClock />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltips */}
      <Tooltip id="editTip" />
      <Tooltip id="addTip" />
      <Tooltip id="deleteTip" />
      <Tooltip id="attendanceTip" />
    </>
  );
}

export default EmployeeTable;
