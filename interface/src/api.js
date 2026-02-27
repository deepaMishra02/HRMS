const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const BASE_URL = isLocal
  ? "http://127.0.0.1:8000/api/admin"
  : "https://backend.hrm.hypertonic.co.in/api/admin";


const API_KEY = "supersecret123";

export async function fetchEmployees() {
    const res = await fetch(`${BASE_URL}/employees/`, {
        headers: {
            "Authorization": API_KEY
        }
    });
    return res.json();
}

export async function createEmployee(data) {
    const res = await fetch(`${BASE_URL}/employees/`, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateEmployee(id, data) {
    const res = await fetch(`${BASE_URL}/employees/${id}/`, {
        method: "PUT",
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteEmployee(id) {
    const res = await fetch(`${BASE_URL}/employees/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": API_KEY
        }
    });
    return res.json();
}

// Attendance APIs
export async function fetchAttendance(employee_id) {
    const res = await fetch(`${BASE_URL}/attendance/?employee_id=${employee_id}`, {
        headers: {
            "Authorization": API_KEY
        }
    });
    return res.json();
}

export async function createAttendance(data) {
    const res = await fetch(`${BASE_URL}/attendance/`, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateAttendance(data) {
    const res = await fetch(`${BASE_URL}/attendance/`, {
        method: "PUT",
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}