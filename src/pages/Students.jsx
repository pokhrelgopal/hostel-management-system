import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { addStudent, getStudents } from "../services/apiStudents";
import Modal from "../ui/Modal";
import AddStudent from "../components/AddStudent";
import Spinner from "../components/Spinner";
import Error from "../ui/Error";

const Students = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const {
    isLoading,
    error,
    data: students,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const studentsMutation = useMutation(
    (newStudentData) => addStudent(newStudentData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
        closeModal();
      },
    }
  );

  const handleStudentSubmit = (newStudentData) => {
    studentsMutation.mutate(newStudentData);
  };

  const filteredStudents = students?.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <>
      <div
        className={`bg-gray-50 min-h-screen px-4 pb-8 text-lg ${
          isModalOpen ? "blur-md" : ""
        }`}
      >
        <h1 className="font-semibold text-3xl py-5">Students</h1>

        <div className="flex items-center justify-between">
          {" "}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by student name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-1 py-2 bg-transparent border-b-2 border-gray-300 w-full outline-0"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={openModal}
            >
              Add new student
            </button>
          </div>
        </div>
        <table className="w-full bg-white" cellPadding={15}>
          <thead className="bg-gray-100">
            <tr>
              <td>Name</td>
              <td>Phone</td>
              <td>Room</td>
              <td>Staying</td>
              <td>Address</td>
              <td>Joined</td>
            </tr>
          </thead>
          <tbody>
            {filteredStudents &&
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="cursor-pointer hover:bg-gray-50 transition duration-300"
                >
                  <td>
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                  </td>
                  <td>{student.phone}</td>
                  <td>
                    {student.room?.block}-{student.room?.room_no}
                  </td>
                  <td>{student.is_staying ? "Yes" : "No"}</td>
                  <td>{student.address}</td>
                  <td>{student.joining_date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add new student"
        content={<AddStudent onSubmit={handleStudentSubmit} />}
      />
    </>
  );
};

export default Students;
