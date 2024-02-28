/* eslint-disable react/prop-types */

function ModalConfirm({ isOpen, onClose, title, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-[600px] mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none py-10">
          <div className="flex items-center justify-center p-3 border-solid border-blueGray-200 rounded-t">
            <h3 className="text-xl font-semibold text-center">{title}</h3>
          </div>
          <div className="relative p-6 flex items-center justify-center space-x-6">
            <button
              className="px-4 py-2 rounded bg-red-600 text-white"
              onClick={() => onConfirm()}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 rounded border border-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
