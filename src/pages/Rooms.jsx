import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import { useState } from "react";
import AddRoom from "../components/AddRoom";
import Spinner from "../components/Spinner";
import Error from "../ui/Error";
import { addRoom, getRooms } from "../services/apiRooms";
import { Link } from "react-router-dom";
import { HiMiniXMark, HiOutlineCheckCircle } from "react-icons/hi2";

const Rooms = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: rooms,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const roomsMutation = useMutation((newRoomData) => addRoom(newRoomData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
      closeModal();
    },
  });

  const handleRoomSubmit = (newRoomData) => {
    roomsMutation.mutate(newRoomData);
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
        <h1 className="font-semibold text-3xl py-5">Rooms</h1>
        <div className="flex justify-end">
          <button
            className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Add new room
          </button>
        </div>
        <table className="w-full bg-white" cellPadding={15}>
          <thead className="bg-gray-100">
            <tr>
              <td>Block</td>
              <td>Room</td>
              <td>Capacity</td>
              <td>Attached Bathroom</td>
              <td>Price (Monthly)</td>
              <td>Available</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map((room) => (
                <tr
                  key={room.id}
                  className="cursor-pointer hover:bg-gray-50 transition duration-300"
                >
                  <td>
                    <Link to={`/rooms/${room.id}`}>{room.block}</Link>
                  </td>
                  <td>{room.room_no}</td>
                  <td>{room.room_capacity}</td>
                  <td>
                    {room.attached_tb ? (
                      <HiOutlineCheckCircle className="text-green-600 text-2xl" />
                    ) : (
                      <HiMiniXMark className=" text-2xl text-red-600" />
                    )}
                  </td>
                  <td>Rs. {room.price}</td>
                  <td>
                    {room.is_available ? (
                      <HiOutlineCheckCircle className="text-green-600 text-2xl" />
                    ) : (
                      <HiMiniXMark className=" text-2xl text-red-600" />
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add new room"
        content={<AddRoom onSubmit={handleRoomSubmit} />}
      />
    </>
  );
};

export default Rooms;
