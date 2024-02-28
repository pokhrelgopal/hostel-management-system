import { CiUser, CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearTokens } from "../store/reducers/authSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    navigate("login");
    dispatch(clearTokens());
  }
  return (
    <header className="py-8 px-4 border-b">
      <div className="flex justify-end items-center text-2xl space-x-5">
        <NavLink to="/account">
          <CiUser />
        </NavLink>
        <button onClick={handleLogout}>
          <CiLogout />
        </button>
      </div>
    </header>
  );
};

export default Header;
