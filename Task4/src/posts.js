let loading = true;
let error = "";
let posts = null;

const setLoading = () => {
  if (loading) {
    document.getElementById("postList").innerHTML = `
      <ul class="space-y-4 grid grid-cols-3 space-x-4">
        ${Array(9)
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
const fetchPosts = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
    <ul class="space-y-4 grid grid-cols-3 space-x-4">
      ${posts
        .map(
          ({ userId, id, title, body }) => `
          <li>
            <div class= "flex rounded-xl flex-col bg-slate-700 p-8 gap-5 text-md w-full h-full min-w-sm min-h-xl">
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
                <span>
                    <label>Description:</label>
                    <div>${body}</div>
                </span>
            </div>
          </li>
        `,
        )
        .join("")}
    </ul>
  `;
};
setLoading();
fetchPosts();
