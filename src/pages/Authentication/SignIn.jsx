import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const SignIn = () => {
  const [focusedField, setFocusedField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loginType, setLoginType] = useState("");

  const navigate = useNavigate();

  // Validate Email and Password (You can add your validation logic here)
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setApiError("Please fill out both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/admin/login", {
        email,
        password
      });
      console.log("Response:", response); // Log the entire response
    
      if (response.data.token) {
        // Save the token in cookies
        Cookies.set("userToken", response.data.token);
    
        // Redirect user to dashboard or appropriate page
        navigate("/dashboard");
      } else {
        setApiError("Invalid login credentials");
      }
    } catch (error) {
      setApiError("Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  

    setLoading(false);
  };

  // Toggle Password Visibility
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleBlur = (field) => {
    setFocusedField("");
    if (field === "email") {
      validateEmail(email);
    } else if (field === "password") {
      validatePassword(password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl flex flex-col items-center gap-6 sm:gap-8 md:gap-9 rounded-3xl p-6 sm:p-8 md:p-12 w-full max-w-sm md:max-w-md lg:max-w-lg"
      >
        <h1 className="text-black uppercase tracking-wider font-bold text-lg sm:text-xl md:text-2xl">
          Sign In
        </h1>

        {/* Email Input */}
        <div className="relative w-full">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
              setFormTouched(true);
            }}
            className={`w-full p-2 outline-none text-black text-base bg-transparent border-l-2 border-b-2 border-black rounded-bl-lg transition-all duration-300 ${
              focusedField === "email" || email
                ? "border-t-2 border-r-2 border-black"
                : ""
            }`}
            onFocus={() => setFocusedField("email")}
            onBlur={() => handleBlur("email")}
          />
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === "email" || email
                ? "translate-x-0 -translate-y-[1.5rem] text-xs sm:text-sm md:text-base bg-black text-white"
                : "translate-y-2 text-black bg-transparent"
            } p-1 pointer-events-none uppercase tracking-wide rounded-3xl`}
          >
            Email
          </span>
          {formTouched && errors.email && (
            <p className="text-red-500 text-xs sm:text-sm md:text-xs mb-1 absolute bottom-[-1.5rem] left-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
              setFormTouched(true);
            }}
            className={`w-full p-2 outline-none text-black text-base bg-transparent border-l-2 border-b-2 border-black rounded-bl-lg transition-all duration-300 ${
              focusedField === "password" || password
                ? "border-t-2 border-r-2 border-black"
                : ""
            }`}
            onFocus={() => setFocusedField("password")}
            onBlur={() => handleBlur("password")}
          />
          <button
            type="button"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === "password" || password
                ? "translate-x-0 -translate-y-[1.5rem] text-xs sm:text-sm md:text-base bg-black text-white"
                : "translate-y-2 text-black bg-transparent"
            } p-1 pointer-events-none uppercase tracking-wide rounded-lg`}
          >
            Password
          </span>
          {formTouched && errors.password && (
            <p className="text-red-500 text-xs sm:text-sm md:text-xs mt-1 absolute bottom-[-1.5rem] left-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* Display API Error */}
        {apiError && (
          <p className="text-red-500 text-xs sm:text-sm md:text-xs mb-1">{apiError}</p>
        )}

        <button
          type="submit"
          className="h-[45px] w-[100px] rounded-3xl border-2 border-black cursor-pointer bg-transparent transition-all duration-500 uppercase text-xs tracking-wider mb-8 hover:bg-black hover:text-white"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
