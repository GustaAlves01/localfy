const input = document.querySelector(".input")
const pButtons = document.querySelectorAll(".pButton")


pButtons.forEach(btn => {
    btn.addEventListener("click", (e)=>{
        input.placeholder = e.target.textContent.toLowerCase()
    })
})


