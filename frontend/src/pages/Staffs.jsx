import { useState } from "react";
import Modal from "../ui/Modal";
import AddStaff from "../components/AddStaff";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStaff, getStaff } from "../services/apiStaffs";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Error from "../ui/Error";

const Staffs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { isLoading, error, data: staffs } = useQuery(["staffs"], getStaff);

  const staffsMutation = useMutation((newStaffData) => addStaff(newStaffData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["staffs"]);
      closeModal();
    },
  });

  const handleStaffSubmit = (newStaffData) => {
    staffsMutation.mutate(newStaffData);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <>
      <div
        className={`bg-gray-50 min-h-screen px-4 pb-8 text-lg ${
          isModalOpen ? "blur-md" : ""
        }`}
      >
        <h1 className="font-semibold text-3xl py-5">Staff Members</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Add new staff
          </button>
        </div>
        <table className="w-full bg-white" cellPadding={15}>
          <thead className="bg-gray-100">
            <tr>
              <td>Name</td>
              <td>Work</td>
              <td>Phone</td>
              <td>Address</td>
              <td>Salary</td>
            </tr>
          </thead>
          <tbody>
            {staffs &&
              staffs.map((staff) => (
                <tr
                  key={staff.id}
                  className="cursor-pointer hover:bg-gray-50 transition duration-300"
                >
                  <td>
                    <Link to={`/staffs/${staff.id}`}>{staff.name}</Link>
                  </td>
                  <td>{staff.work}</td>
                  <td>+977-{staff.phone}</td>
                  <td>{staff.address}</td>
                  <td>{staff.salary}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add new staff"
        content={<AddStaff onSubmit={handleStaffSubmit} />}
      />
    </>
  );
};

export default Staffs;
