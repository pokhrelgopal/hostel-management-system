import axios from "axios";

const URL = "http://127.0.0.1:8000/api/room/";
const TOKEN = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getSingleRoom(id) {
  return axios
    .get(`http://127.0.0.1:8000/api/room/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export async function getRooms() {
  return axios
    .get(URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export async function updateRoom(id, updatedRoomData) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/room/${id}/`,
    updatedRoomData,
    config
  );
  return response.data;
}

export async function addRoom(newRoomData) {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/room/",
    newRoomData,
    config
  );
  return response.data;
}

export async function deleteRoom(id) {
  return axios
    .delete(`http://127.0.0.1:8000/api/room/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
