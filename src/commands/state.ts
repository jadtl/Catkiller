import { AudioPlayer } from '@discordjs/voice'
import internal from 'stream'

import { Queue } from '../data/Queue'

export var timeout: Array<NodeJS.Timeout | undefined> = new Array()
export var queue: Array<Queue<{title: string, url: string, duration: any}>> = new Array()
export var player: Array<AudioPlayer> = new Array()
export var nowPlaying: Array<{title: string, url: string, duration: any} | undefined> = new Array()