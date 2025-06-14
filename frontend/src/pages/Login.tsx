import { useState } from "react";
import Button from "../components/Button";
import { useUserData } from "../hooks/useUserData";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnLoading } = useUserData();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    loginUser(email, password, navigate);
  }
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center items-center">
          <img src="/favicon.svg" alt="Logo" className="w-10 h-10 mx-2"/>
          <h2 className="text-3xl font-semibold text-center">Login to Spotify</h2>
        </div>
        <form className="mt-8" onSubmit={submitHandler}>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={btnLoading}>
            {btnLoading ? "Please Wait..." : "Login"}
          </Button>
        </form>
        <div className="text-center mt-6">
          <Link
            to={"/register"}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Don't have an Account?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
