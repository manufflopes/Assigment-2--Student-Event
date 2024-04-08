async function registerUser(data) {
    const response = await fetch("https://student-event-api.onrender.com/register", {
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
    <div class="jumbotron">
        <h1 class="display-4">Congratulations, you're confirmed !</h1>
    </div>
    <form>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">ID</label>
            <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext"  value="${data.userId}">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Full Name</label>
            <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext"  value="${data.fullName}">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Address</label>
            <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext"  value="${data.address}">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext"  value="${data.status}">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Fee</label>
            <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext"  value="${new Intl.NumberFormat("en-us", {
        style: 'currency',
        currency: 'USD',
    }).format(data.fee)
        }">
            </div >
        </div >
    <button class="btn btn-warning" onclick="location.reload()">Go back!</button>
    </form >

    `

    content.innerHTML = ''
    content.append(div)
}