const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const nothing = document.getElementById("none");

let limit = 6;
let page = 1;

getPosts();
function getPosts() {
  const xhttp = new XMLHttpRequest();
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      posts = JSON.parse(this.responseText);
      showPosts(posts);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function showPosts(posts) {
  posts.forEach((item) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
                <div class="number">${item.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${item.title}</h2>
                    <p class="post-body">${item.body}</p>
                </div>
            `;
    postsContainer.appendChild(postEl);
  });
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.add("show");
    setTimeout(() => {
      page++;
      showPosts(posts);
    });
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
      nothing.innerHTML = "";
    } else {
      post.style.display = "none";
      nothing.innerHTML = "No results";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
