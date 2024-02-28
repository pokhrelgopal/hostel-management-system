import axios from "axios";

const TOKEN = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function updateGuardian(id, updatedGuardian) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/guardian/${id}/`,
    updatedGuardian,
    config
  );
  return response.data;
}

export async function addGuardian(newGuardianData) {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/guardian/",
    newGuardianData,
    config
  );
  return response.data;
}
