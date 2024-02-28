import { useNavigate, useParams } from "react-router-dom";
import { getSingleRoom, updateRoom, deleteRoom } from "../services/apiRooms";
import Spinner from "../components/Spinner";
import Error from "../ui/Error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModalConfirm from "../ui/ModalConfirm";
import Modal from "../ui/Modal";
import { useState } from "react";
import UpdateRoom from "../components/UpdateRoom";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiToiletLight } from "react-icons/pi";
import { HiMiniXMark, HiOutlineCheckCircle } from "react-icons/hi2";

const RoomDetail = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: room,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getSingleRoom(id),
  });

  const handleUpdateRoom = async (updatedStaffData) => {
    try {
      await updateRoom(id, updatedStaffData);
      queryClient.invalidateQueries(["room"]);
      closeEdit();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const deleteOneRoom = async () => {
    try {
      await deleteRoom(id);
      queryClient.invalidateQueries(["rooms"]);
      closeModal();
      navigate("/rooms");
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    room && (
      <>
        <section
          className={`p-10 bg-gray-100 h-full ${
            isModalOpen || isEditOpen ? "blur-sm" : ""
          }`}
        >
          <h2 className="text-3xl font-bold pb-6">Room Details</h2>
          <div className="bg-white rounded-lg">
            <div className="text-2xl font-semibold flex items-center space-x-6 bg-indigo-500 p-5 text-white rounded-t-lg">
              <p>
                Room No {room.room_no} (Block {room.block})
              </p>
              <p></p>
            </div>
            <div className="content p-5 space-y-6">
              <p className="flex items-center space-x-3 text-xl">
                <HiOutlineUsers />{" "}
                <span>{room.room_capacity} student capacity</span>
              </p>
              <p className="flex items-center space-x-3 text-xl">
                <PiToiletLight />
                <span className="flex items-center space-x-3">
                  <span>Attached Bathroom</span>
                  {room.attached_tb ? (
                    <HiOutlineCheckCircle className="text-2xl text-green-500" />
                  ) : (
                    <HiMiniXMark className="text-2xl" />
                  )}
                </span>
              </p>
              <p className="text-xl bg-green-200 p-5 rounded-lg flex items-center justify-center space-x-6">
                Monthly fee Rs.
                <span className="font-semibold">{room.price}</span>
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
          title={`Are you sure you want to this room?`}
          onConfirm={deleteOneRoom}
        />
        <Modal
          isOpen={isEditOpen}
          onClose={closeEdit}
          title="Update Room"
          content={<UpdateRoom room={room} onSubmit={handleUpdateRoom} />}
        />
      </>
    )
  );
};

export default RoomDetail;
