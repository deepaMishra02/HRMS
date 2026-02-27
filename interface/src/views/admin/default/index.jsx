import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Card,
  CardBody,
  Heading,
  Badge,
  VStack,
  HStack,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  fetchEmployees,
  fetchAttendance,
} from "../../../api.js";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserReports() {
  const cardBg = useColorModeValue("white", "gray.800");

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const empData = await fetchEmployees();
      setEmployees(empData.data);

      // Fetch attendance for today
      const attData = await fetchAttendance();
      console.log("Attendance Data:", attData.data);
      const rest = attData.data
      console.log(today)
      const todayAttendance = rest[today] || [];
      console.log("Today's Attendance:", todayAttendance);
      setAttendance(todayAttendance);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate counts
  const totalEmployees = employees.length;

  // ⚠️ Status is capitalized from backend
  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absent = totalEmployees - present;

  const pieData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  const barData = pieData;
  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <Box pt="100px" px="20px">

      {/* Top Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" mb="20px">
        <StatCard title="Total Employees" value={totalEmployees} />
        <StatCard title="Present Today" value={present} color="green.500" />
        <StatCard title="Absent Today" value={absent} color="red.500" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px">

        {/* New Joiners */}
        <Card bg={cardBg}>
          <CardBody>
            <Heading size="md" mb="4">New Joiners</Heading>
            <VStack align="start" spacing="4">
              {employees.slice(-5).map((emp) => (
                <HStack key={emp.id}>
                  <Circle bg="purple.500" color="white" size="40px">
                    {emp.name?.charAt(0)}
                  </Circle>
                  <Box>
                    <Text fontWeight="bold">{emp.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Emp ID: {emp.employee_id}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Pie Chart */}
        <Card bg={cardBg}>
          <CardBody>
            <Heading size="md" mb="4">Distribution</Heading>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Bar Chart */}
        <Card bg={cardBg}>
          <CardBody>
            <Heading size="md" mb="4">Attendance Comparison</Heading>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

      </SimpleGrid>
    </Box>
  );
}

/* Reusable Stat Card */
function StatCard({ title, value, color = "blue.500" }) {
  return (
    <Card>
      <CardBody>
        <Text fontSize="sm" color="gray.500">{title}</Text>
        <Text fontSize="3xl" fontWeight="bold" color={color}>
          {value}
        </Text>
      </CardBody>
    </Card>
  );
}