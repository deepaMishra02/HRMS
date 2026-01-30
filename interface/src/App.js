import "./App.css";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import AttendanceModal from "./components/AttendanceModal";


import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchAttendance,
  createAttendance,
  updateAttendance
} from "./api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [showEmployee, setShowEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Load employees
  const loadEmployees = async () => {
    const res = await fetchEmployees();
    setEmployees(res.data || res);
  };

  const loadAttendance = async (emp) => {
    const res = await fetchAttendance(emp.employee_id);
    setAttendance(res.data || res);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Employee CRUD
  const handleSubmitEmployee = async (data) => {
    let res;

    if (editEmployee) {
      res = await updateEmployee(editEmployee.id, data);
    } else {
      res = await createEmployee(data);
    }

    res.status ? toast.success(res.message) : toast.error(res.message);

    setShowEmployee(false);
    setEditEmployee(null);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    const res = await deleteEmployee(id);

    res.status ? toast.success(res.message) : toast.error(res.message);

    loadEmployees();
  };

  // Attendance
  const handleAttendanceSubmit = async (data) => {
    data.employee_id = selectedEmployee.employee_id;

    if (attendance.find((a) => a.date === data.date)) {
      var res = await createAttendance(data);
    } else {
      var res = await createAttendance(data);
    }

    res.status ? toast.success(res.message) : toast.error(res.message);
    loadAttendance(selectedEmployee);
  };

  return (
    <div className="container">
      <ToastContainer autoClose={2500} />

      <Sidebar />

      <div className="main">
        <EmployeeTable
          employees={employees}
          onAdd={() => setShowEmployee(true)}
          onEdit={(emp) => {
            setEditEmployee(emp);
            setShowEmployee(true);
          }}
          onDelete={handleDelete}
          onAttendance={(emp) => {
            setSelectedEmployee(emp);
            setShowAttendance(true);
            loadAttendance(emp);
          }}
        />
      </div>

      <EmployeeModal
        show={showEmployee}
        onClose={() => setShowEmployee(false)}
        onSubmit={handleSubmitEmployee}
        editEmployee={editEmployee}
      />

      <AttendanceModal
        show={showAttendance}
        employee={selectedEmployee}
        attendance={attendance}
        onClose={() => setShowAttendance(false)}
        onSubmit={handleAttendanceSubmit}
      />
    </div>
  );
}

export default App;
