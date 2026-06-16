let loading = true;
let error = "";
let user = null;

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
const setLoading = () => {
  document.getElementById("details").innerHTML = `
    <div class="animate-pulse flex flex-col bg-slate-700 rounded-xl p-8 gap-5">
      <div class="h-8 bg-slate-600 rounded w-1/3"></div>
      <div class="h-5 bg-slate-600 rounded w-1/2"></div>
      <div class="h-5 bg-slate-600 rounded w-2/3"></div>
      <div class="h-5 bg-slate-600 rounded w-1/3"></div>
      <div class="h-5 bg-slate-600 rounded w-1/2"></div>
      <div class="h-5 bg-slate-600 rounded w-2/3"></div>
    </div>
  `;
};
const displayError = () => {
  loading = false;
  document.getElementById("userList").innerHTML = error;
};
const renderUser = () => {
  const profile = document.getElementById("details");
  profile.innerHTML = `
    <div class="flex flex-col bg-slate-700 rounded-xl p-8 gap-5">
      <div class="flex gap-2">
        <label>ID:</label>
        <div>${user.id}</div>
      </div>
      <div class="flex gap-2">
        <label>Name:</label>
        <div>${user.name}</div>
      </div>
      <div class="flex gap-2">
        <label>Username:</label>
        <div>${user.username}</div>
      </div>
      <div class="flex gap-2">
        <label>Email:</label>
        <div>${user.email}</div>
      </div>
      <div class="flex gap-2">
        <label>Phone:</label>
        <div>${user.phone}</div>
      </div>
      <div class="flex gap-2">
        <label>Website:</label>
        <div>${user.website}</div>
      </div>
      <div class="flex gap-2">
        <label>Company:</label>
        <div>${user.company.name}</div>
      </div>
    </div>
  `;
};

const fetchUser = async () => {
  try {
    if (!userId) {
      throw new Error("User ID not provided.");
    }
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    if (!res.ok) {
      throw new Error(`User not found (${res.status})`);
    } else {
      user = await res.json();
      loading = false;
      renderUser();
    }
  } catch (err) {
    loading = false;
    error = err.message;
    displayError();
  }
};
setLoading();
fetchUser();
