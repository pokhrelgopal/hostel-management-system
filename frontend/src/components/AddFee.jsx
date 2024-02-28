/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFee } from "../services/apiFee";

const AddFee = ({ sid, onSubmit }) => {
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [fee, setFee] = useState(0);
  const [extraFee, setExtraFee] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(addFee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["student"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeeData = {
      student: sid,
      month,
      date,
      monthly_fee: fee,
      extra_fee: extraFee,
      is_paid: isPaid,
    };

    mutation.mutate(newFeeData);
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table className="w-full" cellPadding={10}>
          <tbody>
            <tr>
              <td>Month</td>
              <td>
                <select
                  required
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="bg-slate-100 border outline-0 p-2 rounded w-full"
                >
                  <option value="">Select Month</option>
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Date</td>
              <td>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-100 border outline-0 p-2 rounded w-full"
                />
              </td>
            </tr>
            <tr>
              <td>Fee</td>
              <td>
                <input
                  required
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="bg-slate-100 border outline-0 p-2 rounded w-full"
                />
              </td>
            </tr>
            <tr>
              <td>Extra Fee</td>
              <td>
                <input
                  required
                  type="number"
                  value={extraFee}
                  onChange={(e) => setExtraFee(e.target.value)}
                  className="bg-slate-100 border outline-0 p-2 rounded w-full"
                />
              </td>
            </tr>
            <tr>
              <td>Paid</td>
              <td>
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="bg-slate-100 border outline-0 p-2 rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-3 border rounded bg-indigo-600 text-white"
          >
            Add Fee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFee;
