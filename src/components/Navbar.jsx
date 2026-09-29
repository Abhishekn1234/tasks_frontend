
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getUser,
  logout
} from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();

    toast.success("Logged out");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <h2>TaskFlow</h2>

      <div className="navbar-right">
        <span>
          {user?.name}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

