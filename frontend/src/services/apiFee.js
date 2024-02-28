import axios from "axios";

const TOKEN = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function deleteFee(id) {
  return axios
    .delete(`http://127.0.0.1:8000/api/feecard/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function addFee(newFeeData) {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/feecard/",
    newFeeData,
    config
  );
  return response.data;
}
