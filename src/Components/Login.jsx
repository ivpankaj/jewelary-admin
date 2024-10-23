import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import Font Awesome icons

const SignupCard = () => {
  const [focusedField, setFocusedField] = useState(''); // Track focused field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false); // State to track if the form has been touched
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [apiError, setApiError] = useState(''); // State to track API errors

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const validateEmail = (email) => {
    let emailError = '';
    if (!email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Email is invalid';
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const validatePassword = (password) => {
    let passwordError = '';
    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    validateEmail(email);
    validatePassword(password);

    if (!errors.email && !errors.password && email && password) {
      setLoading(true);
      setApiError('');
      try {
        const response = await fetch(`${api_url}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || 'Login failed. Please try again.');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        localStorage.setItem('authToken', data.token);

        setEmail('');
        setPassword('');
        setFormTouched(false);
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    }
  };

  const handleBlur = (field) => {
    // Only remove the focus if there are no errors and input is empty
    if (field === 'email' && email === '') {
      setFocusedField('');
    } else if (field === 'password' && password === '') {
      setFocusedField('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="card bg-gray-200 shadow-xl flex flex-col items-center gap-9 rounded-3xl p-12 w-96 h-auto"
      >
        <h1 className="text-black uppercase tracking-wider font-bold text-xl mt-6">
          Sign In
        </h1>

        {/* Email Input Field */}
        <div className="relative w-[300px]">
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
              focusedField === 'email' || email
                ? 'border-t-2 border-r-2 border-black'
                : ''
            }`}
            onFocus={() => setFocusedField('email')}
            onBlur={() => handleBlur('email')}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // Submit on Enter
          />
          <span
            className={`absolute left-2 top-2 transform transition-all duration-300 ${
              focusedField === 'email' || email
                ? 'translate-x-0 -translate-y-[1.5rem] text-xs bg-black text-white'
                : 'translate-y-2 text-black bg-transparent'
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
        <div className="relative w-[300px]">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
              setFormTouched(true);
            }}
            className={`w-full p-2 outline-none text-black text-base bg-transparent border-l-2 border-b-2 border-black rounded-bl-lg transition-all duration-300 ${
              focusedField === 'password' || password
                ? 'border-t-2 border-r-2 border-black'
                : ''
            }`}
            onFocus={() => setFocusedField('password')}
            onBlur={() => handleBlur('password')}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // Submit on Enter
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
              focusedField === 'password' || password
                ? 'translate-x-0 -translate-y-[1.5rem] text-xs bg-black text-white'
                : 'translate-y-2 text-black bg-transparent'
            } p-1 pointer-events-none uppercase tracking-wide rounded-lg`}
          >
            Password
          </span>
          {formTouched && errors.password && (
            <p className="text-red-500 text-xs mt-1 absolute bottom-[-1.5rem] left-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* API Error Message */}
        {apiError && <p className="text-red-500 text-xs mb-1">{apiError}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="h-[45px] w-[100px] rounded-md border-2 border-black cursor-pointer bg-transparent transition-all duration-500 uppercase text-xs tracking-wider mb-8 hover:bg-black hover:text-white"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>

        <Link
          to="/forget-password"
          className="text-black hover:text-blue-500 transition duration-300"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default SignupCard;
