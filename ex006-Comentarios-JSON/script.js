const container = document.querySelector(".container")

const loadPost = (nameContent, postContent) => {

    let postContainer = document.createElement("div")
    let profileImg = document.createElement("img")
    let post = document.createElement("div")
    let profileName = document.createElement("h1")
    let comment = document.createElement("p")

    profileImg.classList.add("profile-img")
    profileImg.setAttribute("src", "./assets/profile.png")

    profileName.innerText = nameContent

    comment.innerText = postContent

    post.classList.add("post")
    post.appendChild(profileName)
    post.appendChild(comment)

    postContainer.classList.add("post-container")
    postContainer.appendChild(profileImg)
    postContainer.appendChild(post)

    container.appendChild(postContainer)

}

async function getPosts() {
    try {
        let postsPromise = await fetch("https://jsonplaceholder.typicode.com/posts")
        let data = await postsPromise.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

async function getUsers() {
    try {
        let postsPromise = await fetch("https://jsonplaceholder.typicode.com/users")
        let data = await postsPromise.json()

        return data
    } catch (error) {
        console.log(error)
    }
}


async function main() {
    let posts = await getPosts()
    let filteredPosts = posts.filter( post => post.userId === 1)

    let profiles = await getUsers()


    for (let i = 0; i < 10; i++) {
        let postIdent = filteredPosts[i].body[0].toUpperCase() + filteredPosts[i].body.substring(1)
        loadPost(profiles[i].name, postIdent)
    }

}

main()