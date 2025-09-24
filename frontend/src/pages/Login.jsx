import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useUserStore } from "../store/user";
import OAuth from "../components/OAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const usernameRegex = /^[\w\s-]{3,20}$/;
  const navigate = useNavigate();

  const { fetchUser } = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Username and Password are required");
      return;
    }
    setLoading(true);
    // fake submit
    try {
      await api.post(
        "/users/login",
        {
          username,
          password
        },
        {
          withCredentials: true // Tells the browser to accept cookies from the backend and include them in future requests.
        }
      );
      toast.success("Logged in succesfully!");

      await fetchUser();
      //const user = useUserStore((state) => state.user);
      navigate("/Welcome"); // This should navigate to login page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect password! Please try again");
      } else if (error.response && error.response.data.message == "User not found") {
        toast.error("User not found");
      }
    } finally {
      setLoading(false);
    }
  };
  setTimeout(() => setLoading(false), 1500);
  const user = useUserStore((state) => state.user);
  console.log("User: ", user);

  return (
    <div className="min-h-screen bg-register-bg bg-cover bg-center flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb flex justify-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    value={username}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  {usernameFocus && !usernameRegex.test(username) && (
                    <p className="validator-hint text-sm text-red-600 mt-1">
                      Username must be 3–20 characters
                    </p>
                  )}
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-center mb-2 h-14">
                  <button type="submit" className="btn btn-primary w-40 h-18" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Google Login */}
                <OAuth />
              </form>

              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
