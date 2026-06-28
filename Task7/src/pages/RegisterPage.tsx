import { useState, type SubmitEvent } from "react";
import { setUser, getUser } from "../data/data";
import { useNavigate } from "react-router-dom";
import { emailRegex, passRegex, phoneRegex } from "../components/regex";

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

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = { ...initialErrors };
    let isValid = true;

    const trimmedUsername = formData.username.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedAddress = formData.address.trim();
    const trimmedPhone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (trimmedUsername.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      /*
        tried this instead of current one but too many calls seemed bad thats why cancel
        setErrors((prev) => ({
          ...prev,
          username: "Username must be at least 3 characters.",
        }));
        isValid = false;
      */
      isValid = false;
    }

    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (trimmedAddress.length < 5) {
      newErrors.address = "Please enter your address.";
      isValid = false;
    }

    if (!phoneRegex.test(trimmedPhone)) {
      newErrors.phone =
        "Phone number must contain 10 digits and should start with 98 or 97 only";
      isValid = false;
    }

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
  const userExists = getUser()?.username != null ? true : false;

  return (
    <>
      <h2 className="justify-center flex">Registration Form</h2>
      {!userExists && (
        <div className="flex items-center justify-center text-black my-10">
          <div className="bg-slate-500 w-full max-w-xl rounded-3xl p-8">
            <h1>Create Account</h1>
            <form id="form" className="space-y-3" onSubmit={handleSubmit}>
              <div className="formField mt-5">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="formInput"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
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
                  name="email"
                  placeholder="Enter your email address"
                  className="formInput"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <p className="text-red-500 text-sm mt-1" id="emailError">
                  {errors.email}
                </p>
              </div>
              <div className="formField">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  rows={3}
                  className="formInput"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
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
                  name="phone"
                  placeholder="Enter your 10 digits phone number"
                  className="formInput"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                  name="password"
                  placeholder="Password"
                  className="formInput"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="formInput"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
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
      {userExists && (
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
