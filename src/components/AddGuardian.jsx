/* eslint-disable react/prop-types */
import { useState } from "react";

const AddGuardian = ({ sid, onSubmit, isAdding }) => {
  const [guardian, setGuardian] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGuardianData = {
      name: guardian,
      phone,
      address,
      student: sid,
    };

    onSubmit(newGuardianData);

    setGuardian("");
    setPhone("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="p-2">Guardian Name</td>
            <td className="p-2">
              <input
                required
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                type="text"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Phone</td>
            <td className="p-2">
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Address</td>
            <td className="p-2">
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-4 mt-4">
        <button
          className={`px-4 py-3 border rounded bg-indigo-600 text-white ${
            isAdding ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Guardian"}
        </button>
      </div>
    </form>
  );
};

export default AddGuardian;
