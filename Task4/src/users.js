let loading = true;
let error = "";
let userInfo = null;

const setLoading = () => {
  if (loading) {
    document.getElementById("userList").innerHTML = `
      <ul class="space-y-4">
        ${Array(4)
          .fill()
          .map(
            () => `
            <li>
              <div class="animate-pulse flex rounded-xl flex-col bg-slate-700 p-8 gap-5">
                <div class="h-6 bg-slate-600 rounded w-1/4"></div>
                <div class="h-4 bg-slate-600 rounded w-3/4"></div>
                <div class="h-4 bg-slate-600 rounded w-1/2"></div>
                <div class="h-4 bg-slate-600 rounded w-2/3"></div>
                <div class="h-4 bg-slate-600 rounded w-1/3"></div>
              </div>
            </li>
          `,
          )
          .join("")}
      </ul>
    `;
  }
};
const displayError = () => {
  loading = false;
  document.getElementById("userList").innerHTML = error;
};
const fetchUsers = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      loading = false;
      throw new Error("Bad request");
      userInfo = null;
      return;
    } else {
      userInfo = await res.json();
      loading = false;
      renderUsers();
    }
  } catch (err) {
    loading = false;
    error = err;
    displayError();
  }
};
const renderUsers = () => {
  const userList = document.getElementById("userList");
  userList.innerHTML = `
    <ul class="space-y-4">
      ${userInfo
        .map(
          ({ id, name, username, email, phone }) => `
            <li>
              <div class="flex rounded-xl flex-col bg-slate-700 p-8 gap-5 text-md">
                <h1>
                  <label>ID:</label>
                  <div>${id}</div>
                </h1>
                <div>
                  <label>Name:</label>
                  <div>${name}</div>
                </div>
                <div>
                  <label>Username:</label>
                  <div>${username}</div>
                </div>
                <div>
                  <label>Email:</label>
                  <div>${email}</div>
                </div>
                <div>
                  <label>Phone:</label>
                  <div>${phone}</div>
                </div>
                <div class="flex max-w-full w-full gap-6">
                  <a href="./profile.html" class=" p-10 w-full text-center bg-blue-400 hover:bg-blue-600 font-bold rounded-2xl">Profile</a>
                  <a href="./posts.html" class="p-10 w-full text-center bg-green-400 hover:bg-green-600 font-bold rounded-2xl">Posts</a>
                </div>
              </div>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
};
setLoading();
fetchUsers();
