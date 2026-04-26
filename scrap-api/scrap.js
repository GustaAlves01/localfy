import yts from 'yt-search';

async function fetchUrl(url) {
    const req = await yts({query: url, pageStart: 1, pageEnd:1})
    return req.videos[0]
}

export default fetchUrl
