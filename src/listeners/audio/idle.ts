import * as Discord from '@discordjs/voice'
import ytdl from 'ytdl-core'

import { nowPlaying, queue, timeout } from '../../commands/state'

export default (player: Discord.AudioPlayer, id: number): void => {
    player.on(Discord.AudioPlayerStatus.Idle, () => {
        if (queue[id].isEmpty) {
            nowPlaying[id] = undefined
            timeout[id] = setTimeout(() => {
                const connection = Discord.getVoiceConnection(id.toString())
                if (!connection) return
                connection.disconnect
                timeout[id] = undefined
            }, parseInt(`${process.env.TIMEOUT}`) * 1000)
        } else {
            const result = queue[id].dequeue()
            if (!result) return
            const stream = ytdl(result.url, { filter: 'audioonly', quality: 'highest', highWaterMark: 1 << 25 })
            const resource = Discord.createAudioResource(stream)
            player.play(resource)
            nowPlaying[id] = result
        }
    })
}