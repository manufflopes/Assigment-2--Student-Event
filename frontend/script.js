async function registerUser(data) {
    const response = await fetch("http://localhost:3000/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Registration Error !")
    }

    const result = await response.json()
    return result
}



const form = document.getElementById("registrationForm")
const formError = document.getElementsByClassName("error")[0]

form.addEventListener("submit", async function (event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    try {
        const registrationInfo = await registerUser(formData)
        showConfirmationMessage(registrationInfo)

    } catch (error) {
        console.log(error)
    }
})


function showConfirmationMessage(data) {
    console.log(data);
    const content = document.getElementById("content")

    const div = document.createElement("div")

    div.innerHTML = `
        <h1>Congratulations, you are registered!</h1>
        <p>ID: ${data.userId}</p>
        <p>Name: ${data.fullName}</p>
        <p>Address: ${data.address}</p>
        <p>Status: ${data.status}</p>
        <p>Fee: ${data.fee}</p>

        <button onclick="location.reload()">Register again</button>
    `

    content.innerHTML = ''
    content.append(div)
}