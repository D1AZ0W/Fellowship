let loading = true;
let error = "";
let posts = null;
const params = new URLSearchParams(window.location.search);
var pageNumber = Number(params.get("page")) || 1;

const setLoading = () => {
  if (loading) {
    document.getElementById("postList").innerHTML = `
      <ul class="space-y-4 grid grid-cols-1 md:grid-cols-3 space-x-4">
        ${Array(6)
          .fill()
          .map(
            () => `
            <li>
                <div class="flex rounded-xl flex-col bg-slate-700 p-8 gap-5 text-md w-full h-full min-w-sm min-h-xl animate-pulse">
                    <div class="flex gap-2 items-center">
                        <div class="h-4 w-16 bg-slate-600 rounded"></div> 
                        <div class="h-4 w-8 bg-slate-600 rounded"></div>  
                    </div>
                    <div class="flex gap-2 items-center">
                        <div class="h-4 w-16 bg-slate-600 rounded"></div>
                        <div class="h-4 w-12 bg-slate-600 rounded"></div> 
                    </div>
                    <div class="flex justify-center">
                        <div class="h-6 w-3/4 bg-slate-600 rounded"></div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-4 w-full bg-slate-600 rounded"></div>
                        <div class="h-4 w-full bg-slate-600 rounded"></div>
                        <div class="h-4 w-2/3 bg-slate-600 rounded"></div>
                    </div>
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
  document.getElementById("postList").innerHTML = error;
};
const updatePage = (next) => {
  if (next) {
    pageNumber += 1;
  } else {
    pageNumber -= 1;
  }
  document.getElementById("pageNumber").innerHTML = `${pageNumber}`;
  params.set("page", pageNumber);
  history.pushState({}, "", `${window.location.pathname}?${params}`);
  fetchPosts(pageNumber);
};
const fetchPosts = async (pageNumber) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=6`, //alternatively i couldve done https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=6
    );
    if (!res.ok) {
      loading = false;
      throw new Error("Bad request");
      posts = null;
      return;
    } else {
      posts = await res.json();
      loading = false;
      renderPosts();
    }
  } catch (err) {
    loading = false;
    error = err;
    displayError();
  }
};
const renderPosts = () => {
  const postList = document.getElementById("postList");
  postList.innerHTML = `
    <ul class="space-y-4 grid grid-cols-1 md:grid-cols-3 space-x-4">
      ${posts
        .map(
          ({ userId, id, title, body }) => `
          <li>
            <div class= "flex rounded-xl flex-col bg-slate-700 p-8 gap-5 text-md w-full h-full">
                <h1 class="flex">
                    <label>Post ID:</label>
                    <div>${id}</div>
                </h1>
                <span class="flex">
                    <label>userId:</label>
                    <div>${userId}</div>
                </span>
                <h1 class="flex justify-center">
                    ${title}
                </h1>
                <span class="flex flex-col grow">
                    <label>Description:</label>
                    <div>${body}</div>
                </span>
                <span class="flex bottom-5 w-full justify-between">
                    <button type="button" onclick="handleUpdate(${id})" class="p-5 mt-5 ml-5 bg-cyan-300 hover:bg-green-500 text-black rounded-lg font-bold">Update</button>
                    <button type="button" onclick="handleDelete(${id})" class="p-5 mt-5 bg-cyan-300 hover:bg-red-500 text-black rounded-lg font-bold">Delete</button>
                </span>
            </div>
          </li>
        `,
        )
        .join("")}
    </ul>
  `;
};
(() => {
  document.getElementById("pageNumber").innerHTML = `${pageNumber}`;
  params.set("page", pageNumber);
  history.pushState({}, "", `${window.location.pathname}?${params}`);
})();
setLoading();
fetchPosts(pageNumber);

const handleCreate = () => {};
const handleUpdate = (id) => {
  let newUser = Number(prompt("Enter userId"));
  (posts,
    {
      method,
    });
};
const handleDelete = () => {};
