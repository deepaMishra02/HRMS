// [
//   {
//     "name":"Marketplace",
//     "quantity": 2458, 
//     "date": "12.Jan.2021",
//     "progress": 75.5  
//   },
//   {
//     "name":"Venus DB PRO",
//     "quantity": 1485, 
//     "date": "21.Feb.2021",
//     "progress": 35.4  
//   },
//   {
//     "name":"Venus DS",
//     "quantity": 1024, 
//     "date": "13.Mar.2021",
//     "progress": 25  
//   },
//   {
//     "name":"Venus 3D Asset",
//     "quantity": 858, 
//     "date": "24.Jan.2021",
//     "progress": 100  
//   }
// ]

import { useEffect, useState } from "react";
import fetchEmployees from "../../../../api.js";

export default function TableDataColumns() {
  const [employees, setEmployees] = useState([]);
  
  // Load employees
    const res = fetchEmployees();
    console.log(res);
    setEmployees(res.data || res);
  return res.data || res;
}
