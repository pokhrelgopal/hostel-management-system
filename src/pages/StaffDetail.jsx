import { useNavigate, useParams } from "react-router-dom";
import {
  deleteStaff,
  getSingleStaff,
  updateStaff,
} from "../services/apiStaffs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { CiUser } from "react-icons/ci";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineWorkOutline } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import Error from "../ui/Error";
import ModalConfirm from "../ui/ModalConfirm";
import { useState } from "react";
import Modal from "../ui/Modal";
import UpdateStaff from "../components/UpdateStaff";

const StaffDetail = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const closeEdit = () => setIsEditOpen(false);

  const openEdit = () => setIsEditOpen(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: staff,
  } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => getSingleStaff(id),
  });

  const handleStaffUpdate = async (updatedStaffData) => {
    try {
      await updateStaff(id, updatedStaffData);
      queryClient.invalidateQueries(["staffs"]);
      closeEdit();
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const deleteStaffMember = async () => {
    try {
      await deleteStaff(id);
      queryClient.invalidateQueries(["staffs"]);
      closeModal();
      navigate("/staffs");
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    staff && (
      <>
        <section
          className={`p-10 bg-gray-100 h-full ${
            isModalOpen || isEditOpen ? "blur-sm" : ""
          }`}
        >
          <h2 className="text-3xl font-bold pb-6">Staff Details</h2>
          <div className="bg-white rounded-lg">
            <div className="text-2xl font-semibold flex items-center space-x-6 bg-indigo-500 p-5 text-white rounded-t-lg">
              <p>
                <CiUser />
              </p>
              <p>{staff.name}</p>
            </div>
            <div className="content p-5 space-y-6">
              <p className="flex items-center space-x-3 text-xl">
                <HiOutlineHomeModern />
                <span>{staff.address}</span>
              </p>
              <p className="flex items-center space-x-3 text-xl">
                <MdOutlineWorkOutline />
                <span>Working as a {staff.work}</span>
              </p>
              <p className="text-xl bg-green-200 p-5 rounded-lg flex items-center justify-center space-x-6">
                <GiMoneyStack />
                <span>
                  Monthly Salary Rs. {staff.salary} (Lodging fooding separate)
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 mt-5">
            <button
              className="bg-indigo-600 px-8 py-3 text-white rounded"
              onClick={openEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-600 px-6 py-3 text-white rounded"
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </section>
        <ModalConfirm
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`Are you sure you want to this staff?`}
          onConfirm={deleteStaffMember}
        />
        <Modal
          isOpen={isEditOpen}
          onClose={closeEdit}
          title="Update Staff"
          content={<UpdateStaff staff={staff} onSubmit={handleStaffUpdate} />}
        />
      </>
    )
  );
};

export default StaffDetail;
