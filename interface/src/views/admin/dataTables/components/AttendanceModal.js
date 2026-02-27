import { useState } from "react";

function AttendanceModal({
  show,
  employee,
  attendance,
  onClose,
  onSubmit
}) {
  const [formData, setFormData] = useState({
    date: "",
    status: 1
  });

  if (!show || !employee) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Attendance - {employee.name}</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a, i) => (
                <tr key={i}>
                  <td>{a.date}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr />

        <h3>Add / Update Attendance</h3>

        <input
          type="date"
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setFormData({
              ...formData,
              status: parseInt(e.target.value)
            })
          }
        >
          <option value={1}>Present</option>
          <option value={0}>Absent</option>
        </select>

        <br />
        <br />

        <button onClick={() => onSubmit(formData)} className="save-btn">Save</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default AttendanceModal;