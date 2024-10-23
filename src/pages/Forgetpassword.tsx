import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupCard = () => {
  const [focusedField, setFocusedField] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    let emailError = "";
    if (!email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email is invalid";
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    validateEmail(email);
    

    if (!errors.email && email && password) {
      setLoading(true);
      setApiError("");
      try {
        const response = await fetch("http://localhost:5000/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || "Login failed. Please try again.");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        localStorage.setItem("authToken", data.token);
        setEmail("");
        setPassword("");
        setFormTouched(false);
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBlur = (field) => {
    if ((field === "email" && email === "")) {
      setFocusedField("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="card bg-white shadow-xl flex flex-col items-center gap-9 rounded-3xl p-12 w-96 h-auto"
      >
        <h1 className="text-black uppercase tracking-wider font-bold text-xl mt-6">
          Forget Password
        </h1>

        {/* Email Input Field */}
        <div className="relative w-[300px]">
          <input
            type="text"
            required
            placeholder="Enter Registered email ID"
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === "email" || email
                ? "translate-x-0 -translate-y-[1.5rem] text-xs bg-black text-white"
                : "translate-y-2 text-black bg-transparent"
            } p-1 pointer-events-none uppercase tracking-wide rounded-lg`}
          >
            Email
          </span>
          {formTouched && errors.email && (
            <p className="text-red-500 text-xs mb-1 absolute bottom-[-1.5rem] left-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input Field */}
       
          

        {/* API Error Message */}
        {apiError && <p className="text-red-500 text-xs mb-1">{apiError}</p>}

        {/* Submit Button */}
        <Link to='/forget-password'>
        <button
          type="submit"
          className="h-[45px] w-[100px] rounded-md border-2 border-black cursor-pointer bg-transparent transition-all duration-500 uppercase text-xs tracking-wider mb-8 hover:bg-black hover:text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        </Link>

        
      </form>
    </div>
  );
};

export default SignupCard;
