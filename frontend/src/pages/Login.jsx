import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setToken, token , navigate } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
  if (currentState === 'Sign Up') {

    const response = await axios.post(
      backendUrl + '/api/user/register',
      { name, email, password }
    );

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } else {
      toast.error(response.data.message);
    }

  } else {

    const response = await axios.post(
      backendUrl + '/api/user/login',
      { email, password }
    )
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } else {
      toast.error(response.data.message);
    
    }
  }
} catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message || 'Something went wrong');
}
  }

  useEffect(()=>{
    if (token) {
      navigate("/")
    }
  },[token])

  return (
   <form
  onSubmit={onSubmitHandler}
  className="w-[92%] sm:max-w-md mx-auto mt-44 mb-24 
             bg-white shadow-lg rounded-xl 
             px-6 py-8 flex flex-col gap-4"
>
  {/* Title */}
  <div className="flex items-center justify-center gap-3 mb-2">
    <h2 className="text-3xl font-semibold tracking-wide">
      {currentState}
    </h2>
  </div>

  {/* Name (Sign Up only) */}
  {currentState === "Login" ? ''
  :<input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 
                 rounded-md focus:outline-none 
                 focus:border-black"
      required
    />
    }

  {/* Email */}
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 
               rounded-md focus:outline-none 
               focus:border-black"
    required
  />

  {/* Password */}
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 
               rounded-md focus:outline-none 
               focus:border-black"
    required
  />

  {/* Login helpers */}
  <div className="flex justify-between text-sm mt-1">
    {currentState === "Login" && (
      <p className="cursor-pointer text-gray-600 hover:text-black">
        Forgot your password?
      </p>
    )}

    {currentState === "Login" ? (
      <p
        onClick={() => setCurrentState("Sign Up")}
        className="cursor-pointer font-medium hover:underline"
      >
        Create account
      </p>
    ) : (
      <p
        onClick={() => setCurrentState("Login")}
        className="cursor-pointer font-medium hover:underline"
      >
        Login here
      </p>
    )}
  </div>

  {/* Submit button */}
  <button
    type="submit"
    className="mt-6 bg-black text-white py-2 rounded-md 
               hover:bg-gray-900 transition-all"
  >
    {currentState === "Login" ? "Sign In" : "Sign Up"}
  </button>
</form>

  );
};

export default Login;
