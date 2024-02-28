/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdateStaff = ({ onSubmit, staff: staffData }) => {
  const [staff, setStaff] = useState(staffData.name || "");
  const [work, setWork] = useState(staffData.work || "");
  const [salary, setSalary] = useState(staffData.salary || "");
  const [phone, setPhone] = useState(staffData.phone || "");
  const [address, setAddress] = useState(staffData.address || "");

  const handleSubmit = () => {
    const updatedStaffData = {
      name: staff,
      work,
      salary,
      phone,
      address,
    };

    onSubmit(updatedStaffData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="w-full" cellPadding={10}>
        <tbody>
          <tr>
            <td>Staff Name</td>
            <td>
              <input
                required
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
                type="text"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Work</td>
            <td>
              <input
                required
                value={work}
                onChange={(e) => setWork(e.target.value)}
                type="text"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>
              <input
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                type="number"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-4">
        <button
          className="px-4 py-3 border rounded bg-indigo-600 text-white"
          type="submit"
        >
          Update staff
        </button>
      </div>
    </form>
  );
};

export default UpdateStaff;
