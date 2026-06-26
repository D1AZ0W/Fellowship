import { useState, type SubmitEvent } from "react";
import { setUser, hasUser } from "../data/data";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialErrors: FormErrors = {
  username: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const Form1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = { ...initialErrors };
    let isValid = true;

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();
    const trimmedPhone = phone.trim();

    if (trimmedUsername.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (trimmedAddress.length < 5) {
      newErrors.address = "Please enter your address.";
      isValid = false;
    }

    const phoneRegex = /^[9][7-8][0-9]{8}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      newErrors.phone =
        "Phone number must contain 10 digits and should start with 98 or 97 only";
      isValid = false;
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z]{8,}$/;
    if (!passRegex.test(password)) {
      newErrors.password =
        "Password should have 8 or more characters containing atleast one uppercase, one lowercase and one number.";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const user = {
        username: trimmedUsername,
        email: trimmedEmail,
        address: trimmedAddress,
        phone: trimmedPhone,
      };
      setUser(user);
      setSuccessMessage("Registration Successful!");
      navigate("/profile");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <>
      <h2 className="justify-center flex">Registration Form</h2>
      {!hasUser() && (
        <div className="flex items-center justify-center text-black my-10">
          <div className="bg-slate-500 w-full max-w-xl rounded-3xl p-8">
            <h1>Create Account</h1>
            <form id="form" className="space-y-3" onSubmit={handleSubmit}>
              <div className="formField mt-5">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="formInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-red-500 text-sm mt-1" id="usernameError">
                  {errors.username}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="formInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-red-500 text-sm mt-1" id="emailError">
                  {errors.email}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  placeholder="Enter your address"
                  rows={3}
                  className="formInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <p className="text-red-500 text-sm mt-1" id="addressError">
                  {errors.address}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your 10 digits phone number"
                  className="formInput"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="text-red-500 text-sm mt-1" id="phoneError">
                  {errors.phone}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="formInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500 text-sm mt-1" id="passwordError">
                  {errors.password}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="formInput"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p
                  className="text-red-500 text-sm mt-1"
                  id="confirmPasswordError"
                >
                  {errors.confirmPassword}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-b from-purple-300 to-slate-800 text-white p-3 rounded-lg font-semibold hover:to-blue-300 hover:text-black hover:scale-110 transition-all"
              >
                Register
              </button>

              <p
                id="successMessage"
                className="text-green-600 text-center font-medium"
              >
                {successMessage}
              </p>
            </form>
          </div>
        </div>
      )}
      {hasUser() && (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="bg-slate-600 rounded-3xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="font-bold mb-4">Already Registered</h2>
            <button
              onClick={() => navigate("/profile")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};
