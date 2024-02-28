import axios from "axios";

const URL = "http://127.0.0.1:8000/api/staff/";
const TOKEN = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getStaff() {
  return axios
    .get(URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export async function getSingleStaff(id) {
  return axios
    .get(`http://127.0.0.1:8000/api/staff/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function addStaff(newStaffData) {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/staff/",
    newStaffData,
    config
  );
  return response.data;
}

export async function updateStaff(id, updatedStaffData) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/staff/${id}/`,
    updatedStaffData,
    config
  );
  return response.data;
}

export async function deleteStaff(id) {
  return axios
    .delete(`http://127.0.0.1:8000/api/staff/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
