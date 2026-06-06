import axios from 'axios'
import * as cheerio from 'cheerio'

async function scrap(url) {
    let musics = []
    
    try {
        const res = await axios.get(url)
        const $ = cheerio.load(res.data)
        const album = $('meta[property="og:title"]').attr('content').split(' - ')[0]
        musics.push({album: album})
        $('div[data-encore-id="listRow"]').each((i, music) => {
            const nome = $(music).find('p[data-encore-id="listRowTitle"]').text()
            const autor = $(music).find('p[data-encore-id="listRowDetails"]').text()
            musics.push({nome: nome, autor:autor})
        })
    } catch (error){
        console.log("Erro no scrap: "+error)
    }
    return musics
}

/*async function passToHtml (url) {
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    console.log(res.data)
} 
passToHtml("https://open.spotify.com/album/6PFPjumGRpZnBzqnDci6qJ")*/

export default scrap