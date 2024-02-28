import axios from "axios";

const URL = "http://127.0.0.1:8000/api/student/";
const TOKEN = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getSingleStudent(id) {
  return axios
    .get(`http://127.0.0.1:8000/api/student/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export async function getStudents() {
  return axios
    .get(URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function addStudent(newStudentData) {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/student/",
    newStudentData,
    config
  );
  return response.data;
}

export async function deleteStudent(id) {
  return axios
    .delete(`http://127.0.0.1:8000/api/student/${id}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function updateStudent(id, updatedStudentData) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/student/${id}/`,
    updatedStudentData,
    config
  );
  return response.data;
}
