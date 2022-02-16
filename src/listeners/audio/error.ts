import { AudioPlayer, AudioPlayerError } from '@discordjs/voice'

export default (player: AudioPlayer): void => {
    player.on('error', (error: AudioPlayerError) => {
        console.error(`Audio player error: ${error.message}`)
    })
}