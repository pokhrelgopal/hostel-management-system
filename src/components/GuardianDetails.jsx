/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdateGuardian = ({ onSubmit, guardian: guardianData }) => {
  const [guardian, setGuardian] = useState(guardianData.name || "");
  const [phone, setPhone] = useState(guardianData.phone || "");
  const [address, setAddress] = useState(guardianData.address || "");
  const [id, setId] = useState(guardianData.id || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGuardianData = {
      id,
      name: guardian,
      phone,
      address,
    };

    onSubmit(updatedGuardianData);
    setId(null);
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
          className="px-4 py-3 border rounded bg-indigo-600 text-white"
          type="submit"
        >
          Update Guardian
        </button>
      </div>
    </form>
  );
};

export default UpdateGuardian;
