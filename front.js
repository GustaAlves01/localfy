const input = document.querySelector(".input")
const pButtons = document.querySelector(".buttons")

pButtons.addEventListener("click", (e) => {
    console.log(e)
    if (e.target.classList.contains("pButton")) {
        input.placeholder = `Set the ${e.target.textContent.toLowerCase()} url.`
    }
}
)



