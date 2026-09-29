
import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle
} from "lucide-react";

import { registerUser } from "../api/authApi";
import { saveAuth } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await registerUser(form);

      saveAuth(data);

      toast.success(
        "Registration successful"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-circle circle-one"></div>
      <div className="auth-background-circle circle-two"></div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="brand-icon">
            <CheckCircle size={25} />
          </div>

          <span>TaskFlow</span>
        </div>

        <form
          className="auth-card"
          onSubmit={handleSubmit}
        >
          <div className="auth-header">
            <h1>Create Account</h1>

            <p>
              Create your account and start
              managing tasks.
            </p>
          </div>

          <div className="form-group">
            <label>Name</label>

            <div className="input-wrapper">
              <User size={19} />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>

            <div className="input-wrapper">
              <Mail size={19} />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={19} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                minLength="6"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

          <div className="auth-footer">
            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

