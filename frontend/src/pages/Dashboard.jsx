import { useEffect, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBarChart } from "react-icons/Bs";
import { GiReceiveMoney } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../services/apiStudents";
import { getRooms } from "../services/apiRooms";
import Spinner from "../components/Spinner";
import Error from "../ui/Error";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [occupied, setOccupied] = useState(0);
  const [income, setIncome] = useState(0);

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    onSuccess: (data) => {
      setStudentCount(data.length);
      const totalIncome = data.reduce((acc, student) => {
        if (student.room && student.room.price) {
          const price = parseFloat(student.room.price);
          return acc + price;
        }
        return acc;
      }, 0);
      setIncome(totalIncome);
    },
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  useEffect(() => {
    if (studentCount > 0 && rooms) {
      const totalRoomCapacity = rooms.reduce(
        (accumulator, room) => accumulator + room.room_capacity,
        0
      );

      const occupancyRate = ((studentCount / totalRoomCapacity) * 100).toFixed(
        2
      );

      setOccupied(occupancyRate);
    }
  }, [studentCount, rooms]);

  useEffect(() => {}, [students, rooms, income]);

  const {
    isLoading,
    error,
    data: studentsData,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <section className="bg-gray-50 min-h-screen px-4 pb-8">
      <h1 className="font-semibold text-3xl py-5">Dashboard</h1>
      <div className="flex items-center justify-between gap-12 mb-10">
        <div className="w-full p-4 border rounded flex items-center gap-6 bg-white">
          <p className="bg-blue-100 p-4 rounded-full">
            <HiOutlineUsers className="text-xl" />
          </p>
          <p className="flex flex-col">
            <span className="text-xl font-bold">{studentCount}</span>
            <span className="text-xl">Students</span>
          </p>
        </div>
        <div className="w-full p-4 border rounded flex items-center gap-6 bg-white">
          <p className="bg-emerald-100 p-4 rounded-full">
            <BsBarChart className="text-xl" />
          </p>
          <p className="flex flex-col">
            <span className="text-xl font-bold">{occupied}%</span>
            <span className="text-xl">Occupied</span>
          </p>
        </div>
        <div className="w-full p-4 border rounded flex items-center gap-6 bg-white">
          <p className="bg-green-100 p-4 rounded-full">
            <GiReceiveMoney className="text-xl" />
          </p>
          <p className="flex flex-col">
            <span className="text-xl font-bold">Rs. {income}</span>
            <span className="text-xl">Per Month</span>
          </p>
        </div>
      </div>
      <div className="flex items-start justify-between gap-12">
        <div className="w-full p-4 border rounded bg-white">
          <p className="text-xl font-semibold pb-5">Recent</p>
          <table className="w-full" cellPadding={15}>
            <thead>
              <tr>
                <th className="text-left">Status</th>
                <th className="text-left">Name</th>
                <th className="text-left">Arrival Date</th>
                <th className="text-left">Room</th>
              </tr>
            </thead>
            <tbody>
              {studentsData
                .sort(
                  (a, b) => new Date(b.joining_date) - new Date(a.joining_date)
                )
                .slice(0, 4)
                .map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="bg-emerald-400 text-white rounded-full px-3 py-1">
                        Arrived
                      </span>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.joining_date}</td>
                    <td>
                      {student.room?.block}-{student.room?.room_no}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
