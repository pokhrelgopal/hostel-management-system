/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../services/apiRooms";
const UpdateStudent = ({ onSubmit, studentData }) => {
  const [name, setName] = useState(studentData.name || "");
  const [dob, setDob] = useState(studentData.date_of_birth || "");
  const [address, setAddress] = useState(studentData.address || "");
  const [phone, setPhone] = useState(studentData.phone || "");
  const [college, setCollege] = useState(studentData.college || "");
  const [room, setRoom] = useState(
    `${studentData.room.block}-${studentData.room.room_no}` || ""
  );
  const [joined, setJoined] = useState(studentData.joining_date || "");
  const [isStaying, setIsStaying] = useState(studentData.is_staying);

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudentData = {
      name,
      date_of_birth: dob,
      address,
      phone,
      college,
      room_id: room,
      joining_date: joined,
      is_staying: isStaying,
    };

    onSubmit(updatedStudentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="w-full" cellPadding={10}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                type="date"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                type="text"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="number"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>College/Institute</td>
            <td>
              <input
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                type="text"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Room</td>
            <td>
              <select
                value={studentData.room.id}
                onChange={(e) => setRoom(e.target.value)}
                required
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              >
                <option value="">Select Room</option>
                {rooms &&
                  rooms.map((roomOption) => (
                    <option key={roomOption.id} value={roomOption.id}>
                      {roomOption.block}-{roomOption.room_no}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Joined Date</td>
            <td>
              <input
                value={joined}
                onChange={(e) => setJoined(e.target.value)}
                required
                type="date"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Is Staying</td>
            <td>
              <input
                checked={isStaying}
                onChange={() => setIsStaying(!isStaying)}
                type="checkbox"
                className="bg-slate-100 border outline-0 p-2 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-4 py-3 border rounded bg-indigo-600 text-white"
        >
          Update student
        </button>
      </div>
    </form>
  );
};

export default UpdateStudent;
