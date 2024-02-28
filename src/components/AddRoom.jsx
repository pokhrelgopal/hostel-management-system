/* eslint-disable react/prop-types */
import { useState } from "react";

const AddRoom = ({ onSubmit }) => {
  const [block, setBlock] = useState("");
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [attached, setAttached] = useState(false);

  const handleCheckboxChange = (e) => {
    setAttached(e.target.checked);
  };
  function handleSubmit() {
    if (block.length > 9) {
      alert("Block name must be less than 10 characters.");
    }
    const newRoomData = {
      block,
      room_no: number,
      room_capacity: capacity,
      price,
      attached_tb: attached,
    };
    onSubmit(newRoomData);
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <table className="w-full" cellPadding={10}>
        <tbody>
          <tr>
            <td>Block Name</td>
            <td>
              <input
                required
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                type="text"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Room No</td>
            <td>
              <input
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Capacity</td>
            <td>
              <input
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                type="number"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded w-full"
              />
            </td>
          </tr>
          <tr>
            <td>Attached Bathroom</td>
            <td>
              <input
                type="checkbox"
                checked={attached}
                onChange={handleCheckboxChange}
                name=""
                id=""
                className="bg-slate-100 border outline-0 p-2 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-4">
        <button
          className="px-4 py-3 border rounded bg-indigo-600 text-white"
          onClick={handleSubmit}
        >
          Add room
        </button>
      </div>
    </form>
  );
};

export default AddRoom;
