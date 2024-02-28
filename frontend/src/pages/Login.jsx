import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLogin } from "../services/apiLogin";
import Logo from "../ui/Logo";
import { useDispatch } from "react-redux";
import { setTokens } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("pokhrelgopal27@gmail.com");
  const [password, setPassword] = useState("gopal");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      showToast("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiLogin(email, password);
      const { access, refresh } = response;
      dispatch(setTokens({ accessToken: access, refreshToken: refresh }));
      navigate("/");
    } catch (error) {
      showToast(error.response.data.detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 h-screen">
      <div className="flex flex-col items-center justify-center pt-24">
        <div>
          <Logo />
        </div>
        <h1 className="font-semibold text-3xl">Log in to your account</h1>
        <form
          className="w-96 mt-8 bg-white px-5 py-8 rounded space-y-5"
          method="POST"
        >
          <div className="flex flex-col space-y-1">
            <label>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="border outline-0 p-2 rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border outline-0 p-2 rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <button
              disabled={isLoading}
              className="bg-indigo-500 text-white w-full py-3 rounded hover:bg-indigo-700 transition duration-300"
              onClick={handleSubmit}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
