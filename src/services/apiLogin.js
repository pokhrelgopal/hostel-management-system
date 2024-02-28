import axios from "axios";

export async function apiLogin(username, password) {
  const loginUrl = "http://127.0.0.1:8000/api/token/";

  const response = await axios.post(loginUrl, {
    username: username,
    password: password,
  });

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Authentication failed");
}
