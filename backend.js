import express from 'express'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fetchUrl from './scrap-api/scrap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/submit", async (req, res) => {
  try {
    const url = req.body.url

    if(url){
        res.json(await fetchUrl(url))
    }
    
    return res.status(400).send("Erro: url vazia")
     
  } catch(error) {
    res.status(500).send("Erro: "+error)
  }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("App online")
})