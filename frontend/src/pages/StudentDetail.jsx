import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CiUser, CiCalendarDate } from "react-icons/ci";
import {
  HiOutlineHomeModern,
  HiOutlinePhone,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { MdOutlineMeetingRoom } from "react-icons/md";
import Spinner from "../components/Spinner";
import Error from "../ui/Error";
import calculateAge from "../helpers/ageCalculator";
import FeeDetails from "../components/FeeDetails";
import GuardianDetails from "../components/GuardianDetails";
import Modal from "../ui/Modal";
import { addGuardian, updateGuardian } from "../services/apiGuardian";
import {
  getSingleStudent,
  deleteStudent,
  updateStudent,
} from "../services/apiStudents";
import AddGuardian from "../components/AddGuardian";
import ModalConfirm from "../ui/ModalConfirm";
import UpdateStudent from "../components/UpdateStudent";

const StudentDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showStudentUpdate, setShowStudentUpdate] = useState(false);

  const navigate = useNavigate();

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openStudentUpdateModal = () => setShowStudentUpdate(true);
  const closeStudentUpdateModal = () => setShowStudentUpdate(false);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    data: student,
    isLoading,
    isError,
  } = useQuery(["student", id], () => getSingleStudent(id));

  const updateGuardianMutation = useMutation((updatedGuardianData) =>
    updateGuardian(student.guardian.id, updatedGuardianData)
  );

  const addGuardianMutation = useMutation((newGuardianData) =>
    addGuardian(newGuardianData)
  );

  const handleGuardianUpdate = async (updatedGuardianData) => {
    await updateGuardianMutation.mutateAsync(updatedGuardianData);
    queryClient.invalidateQueries(["student", id]);
    closeModal();
  };

  const handleGuardianAdd = async (newGuardianData) => {
    await addGuardianMutation.mutateAsync(newGuardianData);
    queryClient.invalidateQueries(["student", id]);
    closeModal();
  };

  const deleteStudentData = async () => {
    try {
      await deleteStudent(student.id);
      queryClient.invalidateQueries(["students"]);
      closeModal();
      navigate("/students");
    } catch (error) {
      console.error("Error deleting Student:", error);
    }
  };

  const handleStudentUpdate = async (updatedStudentData) => {
    try {
      await updateStudent(id, updatedStudentData);
      queryClient.invalidateQueries(["student"]);
      closeStudentUpdateModal();
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    student && (
      <>
        <section
          className={`p-10 bg-gray-100 h-full ${
            showModal || showConfirm || showStudentUpdate ? "blur-md" : ""
          }`}
        >
          <h2 className="text-3xl font-bold pb-6">Student Details</h2>
          <div className="bg-white rounded-lg">
            <div className="text-xl font-semibold flex items-center space-x-6 bg-indigo-500 p-5 text-white rounded-t-lg">
              <p>
                <CiUser />
              </p>
              <p className="space-x-2">
                <span>{student.name}</span>
                <span>({calculateAge(student.date_of_birth)} years old)</span>
              </p>
            </div>
            <div className="content p-5 space-y-6">
              <p className="flex items-center space-x-3 ">
                <HiOutlineHomeModern />
                <span>{student.address}</span>
              </p>
              <p className="flex items-center space-x-3 ">
                <HiOutlinePhone />
                <span>{student.phone}</span>
              </p>
              <p className="flex items-center space-x-3 ">
                <HiOutlineBuildingOffice2 />
                <span>{student.college}</span>
              </p>
              <p className="flex items-center space-x-3 ">
                <CiCalendarDate />
                <span>
                  Joined on{" "}
                  <span className="font-semibold">{student.joining_date}</span>
                </span>
              </p>
              <p className="flex items-center space-x-3 ">
                <MdOutlineMeetingRoom />
                <span>
                  Staying in Room{" "}
                  <span className="font-semibold">
                    {student.room.block}-{student.room.room_no}
                  </span>
                </span>
              </p>
              <p className=" bg-green-200 p-5 rounded-lg flex items-center justify-center space-x-6">
                <span>
                  Monthly Fee Rs.
                  <span className="font-semibold">{student.room?.price}</span>
                  (Lodging fooding included)
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 mt-5">
            {student.guardian ? (
              <button
                onClick={openModal}
                className="bg-indigo-500 px-8 py-3 text-white rounded"
              >
                View Guardian
              </button>
            ) : (
              <button
                onClick={openModal}
                className="bg-indigo-500 px-8 py-3 text-white rounded"
              >
                Add Guardian
              </button>
            )}
            <button
              onClick={openStudentUpdateModal}
              className="bg-green-500 px-8 py-3 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={openConfirm}
              className="bg-red-600 px-6 py-3 text-white rounded"
            >
              Delete
            </button>
          </div>

          <div>
            <FeeDetails sid={student.id} feeInfo={student.fee_info} />
          </div>
        </section>
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={student.guardian ? "Guardian Details" : "Add Guardian"}
          content={
            student.guardian ? (
              <GuardianDetails
                guardian={student.guardian}
                onSubmit={handleGuardianUpdate}
                isUpdating={updateGuardianMutation.isLoading}
              />
            ) : (
              <AddGuardian
                sid={student.id}
                onSubmit={handleGuardianAdd}
                isAdding={addGuardianMutation.isLoading}
              />
            )
          }
        />
        <Modal
          isOpen={showStudentUpdate}
          onClose={closeStudentUpdateModal}
          title={"Update Student Details"}
          content={
            <UpdateStudent
              studentData={student}
              onSubmit={handleStudentUpdate}
            />
          }
        />
        <ModalConfirm
          isOpen={showConfirm}
          onClose={closeConfirm}
          title={"Are you sure you want to delete this student"}
          onConfirm={deleteStudentData}
        />
      </>
    )
  );
};

export default StudentDetail;
