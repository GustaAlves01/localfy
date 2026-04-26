import express from 'express'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fetchUrl from './scrap-api/scrap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(path.join(__dirname, "../frontend")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/submit", async (req, res) => {
  try {
    const url = req.body.url

    if(!url){
        return res.status(400).send("Erro: url vazia")
    }
    return res.json(await fetchUrl(url))
    
     
  } catch(error) {
    res.status(500).send("Erro: " +error)
  }
})

app.get("/", (req, res) => {
    const index = path.join(__dirname, "../frontend/index.html")
    res.sendFile(index)
})

app.listen(process.env.PORT, () => {
    console.log("App online")
})