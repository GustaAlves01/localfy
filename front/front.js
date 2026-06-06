const form = document.querySelector("form")
const cardContainer = document.querySelector(".card-container")
const notificationContainer = document.querySelector(".notification-container")
const url = document.querySelector(".url")

window.addEventListener("DOMContentLoaded", (e) => {
    url.value = ""
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if(url.value){
        const res = await extract('send', {url: url.value})
        const data = await res.json()
        if (res.ok){
            createCard(data)
            notification("Sucesso ao extrair do spotify")
        }
        else {
            notification(data.message)
        }
    }
    else {
        notification("Url vazia")
    }
})

async function createCard(musicList){
    cardContainer.style.display = "block"
    cardContainer.innerHTML = ""
    const album = document.createElement("h2")
    album.innerText = musicList[0].album
    const downloadAll = document.createElement("button")
    downloadAll.innerText = "Baixar todas"
    downloadAll.addEventListener("click", async (e) => {
        for (const m of musicList.slice(1)){
            await downloadAudio([m])
            await new Promise(r => setTimeout(r, 1500))
        }
    })
    cardContainer.appendChild(album)
    cardContainer.appendChild(downloadAll)

    for(let m of musicList.slice(1)){
        const nome = document.createElement("h2")
        const autor = document.createElement("h3")
        const card = document.createElement("div")
        const downloadSingle = document.createElement("button")

        card.classList.add("card")
        nome.innerText = m.nome
        autor.innerText = m.autor
        downloadSingle.innerText = "Download"
        downloadSingle.addEventListener("click", async (e) => {
            await downloadAudio([m])
        })

        card.appendChild(nome)
        card.appendChild(autor)
        card.appendChild(downloadSingle)
        cardContainer.appendChild(card)
        card.offsetWidth
        card.classList.toggle("active")
        await new Promise(r => setTimeout(r,100))
    }

   
}

async function downloadAudio(param) {
    console.log(param[0])
    console.log(typeof(param))
    
    const music = param[0]
    try {
        notification(`Baixando: ${music.nome}`)

        const url = `/download?nome=${encodeURIComponent(music.nome)}&autor=${encodeURIComponent(music.autor)}`
        const response = await fetch(url)
        console.log(response)

        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${music.nome}.mp3`
        document.body.appendChild(a)
        a.click()
        a.remove()
        
        window.URL.revokeObjectURL(blobUrl)
        notification(`Sucesso ao baixar: ${music.nome}`)
    }
    catch (error) {
        notification(`Erro ao baixar: ${music.nome}`)
    }
}

async function extract(url, param) {
    return await fetch(`/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param) 
    })
}

async function notification(code){
    const notification = document.createElement("div")
    const text = document.createElement("p")
    const notificationBar = document.createElement("div")

    text.innerText = code
    notification.classList.add("notification")
    notificationBar.classList.add("notification-bar")
    notification.appendChild(text)
    notification.appendChild(notificationBar)
    notificationContainer.appendChild(notification)

    notification.offsetWidth
    notificationBar.classList.toggle("active")
    notification.classList.toggle("active")
    setTimeout(() => {
        notification.classList.toggle("active")
        setTimeout(() => {
            notification.remove()
        }, 500);
    }, 3000);
   
    
}
