import express from 'express'
import cors from 'cors'
import scrap from './funcoes/scrap.js'
import ytDownload from './funcoes/download.js'
import 'dotenv/config'

const app = express()
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.static(`${__dirname}/front`))
app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/front/index.html`)
})


app.post("/send", async (req, res) => { 
    try{
        const scrapData = await scrap(req.body.url)
        if(!scrapData || scrapData.length === 0){
            
            return res.status(404).json({message: "Erro: url invalida"})
        }
        return res.status(200).json(scrapData)
    } catch (error) {
        res.status(500).json({message: "Erro no servidor"})
    }
})

app.get("/download", async (req, res) => {
    try{
        const {nome, autor} = req.query
        const busca = `${nome}-${autor}`
        const audio = await ytDownload(busca)

        res.setHeader('Content-Disposition',
                    `attachment; filename="${nome}-${autor}.mp3"`)
        res.setHeader('Content-Type', 'audio/mpeg')

        audio.pipe(res)

        req.on('end', () => {
            audio.end()
        })

    } catch (error){
        res.status(500).json({message: "Erro ao baixar"})
    }
})

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log("App online")
})