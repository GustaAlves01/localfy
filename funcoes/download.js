import youtubedl from 'youtube-dl-exec'

async function ytDownload(search) {

    return youtubedl.exec(
        `ytsearch1:${search}`,
        {
            output: '-',
            format: 'bestaudio',
            extractAudio: true,
            audioFormat: 'mp3',
            noWarnings: true
        },
        {
            stdio: ['ignore', 'pipe', 'ignore']
        }
    ).stdout
}

export default ytDownload