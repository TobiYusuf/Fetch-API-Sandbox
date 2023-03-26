document.getElementById('getText').addEventListener('click', loadText)
document.getElementById('getUsers').addEventListener('click', getUsers)
document.getElementById('getPosts').addEventListener('click', getPosts)
document.getElementById('addPosts').addEventListener('submit', addPosts)

function loadText() {
    // fetch returns a promise
    fetch('sample.txt')
        .then((res) => res.text())
        .then((data) => {
            data = `<div class="card card-body mt-3">${data}</div>`

            document.getElementById('output').innerHTML = data
        })
        .catch((err) => {
            console.log(err)
        })
}

function getUsers() {
    fetch('users.json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            let output = '<h2 class="mb-4">Users</h2>';
            data.forEach((user) => {
                output += `
                <ul class="list-group mb-3">
                    <li class="list-group-item">ID: ${user.id}</li>
                    <li class="list-group-item">Name: ${user.name}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                </ul>
                `
            });
            document.getElementById('output').innerHTML = output
        })
}


function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            let output = '<h2 class="mb-4">Posts</h2>';
            data.forEach((post) => {
                output += `
                <div class="card card-body mb-3">
                    <h3>ID: ${post.title}</h3>
                    <p>Name: ${post.body}</p>
                </div>
                `
            });
            document.getElementById('output').innerHTML = output
        })
        .catch((err) => {
            console.log("ERORR!!!!!!!")
        })
}

function addPosts(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
        },
        body: JSON.stringify({ title: title, body: body })
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}