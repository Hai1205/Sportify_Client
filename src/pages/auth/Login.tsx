import { GoogleLoginButton } from "@/components/ui/0auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { isLoading, login } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    await login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Login to Spotify
        </h2>

        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              type="username"
              placeholder="Email or Username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <button disabled={isLoading} className="auth-btn w-full max-w-xs">
              {isLoading ? "Please Wait..." : "Login"}
            </button>
          </div>
        </form>
      
        <div className="flex justify-center mt-4">
          <GoogleLoginButton />
        </div>

        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            don't have accont?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
