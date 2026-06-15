function handleSubmit(e) {
  e.preventDefault();
  document.getElementById("usernameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("addressError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";
  document.getElementById("successMessage").textContent = "";

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;
  if (username.length < 3) {
    document.getElementById("usernameError").textContent =
      "Username must be at least 3 characters.";
    isValid = false;
  }

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email.";
    isValid = false;
  }

  if (address.length < 5) {
    document.getElementById("addressError").textContent =
      "Please enter your address.";
    isValid = false;
  }

  const phoneRegex = /^[9][7-8][0-9]{8}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").textContent =
      "Phone number must contain 10 digits and should start with 98 or 97 only";
    isValid = false;
  }

  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z]{8,}$/;
  if (!passRegex.test(password)) {
    document.getElementById("passwordError").textContent =
      "Password should have 8 or more characters containing atleast one uppercase, one lowercase and one number.";
    isValid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent =
      "Passwords do not match.";
    isValid = false;
  }

  if (isValid) {
    const user = {
      username,
      email,
      address,
      phone,
    };
    localStorage.setItem("user", JSON.stringify(user));
    document.getElementById("successMessage").textContent =
      "Registration Successful!";

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 2000);
  }
}
function handleDelete() {
  localStorage.removeItem("user");
  alert("Profile deleted!");
  window.location.href = "../index.html";
}
