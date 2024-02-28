/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalConfirm from "../ui/ModalConfirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFee } from "../services/apiFee";
import AddFee from "./AddFee";
import Modal from "../ui/Modal";

const FeeDetails = ({ feeInfo, sid }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeeId, setSelectedFeeId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const openAddForm = () => setIsAddOpen(true);
  const closeAddForm = () => setIsAddOpen(false);

  const queryClient = useQueryClient();

  const openModal = (feeId) => {
    setSelectedFeeId(feeId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFeeId(null);
    setModalOpen(false);
  };

  const mutationDelete = useMutation(deleteFee, {
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries(["student"]);
    },
  });

  const handleDelete = () => {
    mutationDelete.mutate(selectedFeeId);
  };

  return (
    <>
      <table className="w-full mt-16 bg-white" cellPadding={15}>
        <thead className="bg-white font-semibold border-b">
          <tr>
            <td>Month</td>
            <td>Date Paid</td>
            <td>Amount</td>
            <td>Extra Fee (if any)</td>
            <td>Paid</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {feeInfo.map((feeCard) => (
            <tr key={feeCard.id}>
              <td>{feeCard.month}</td>
              <td>{feeCard.date}</td>
              <td>{feeCard.monthly_fee}</td>
              <td>{feeCard.extra_fee ? feeCard.extra_fee : "No"}</td>
              <td>{feeCard.is_paid ? "Yes" : "No"}</td>
              <td>
                <div className="space-x-4">
                  <button
                    className="px-3 py-1 bg-red-500 rounded text-white"
                    onClick={() => openModal(feeCard.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <button
          onClick={openAddForm}
          className="px-4 py-3 bg-indigo-500 rounded text-white"
        >
          Add Fee Entry
        </button>
      </div>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Are you sure you want delete this entry?`}
        onConfirm={handleDelete}
      />
      <Modal
        isOpen={isAddOpen}
        onClose={closeAddForm}
        title="Add Fee"
        content={<AddFee sid={sid} onSubmit={closeAddForm} />}
      />
    </>
  );
};

export default FeeDetails;
