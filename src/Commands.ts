import { Command } from './Command'

import { Connect } from './commands/music/Connect'
import { Search } from './commands/music/Search'
import { Play } from './commands/music/Play'
import { Disconnect } from './commands/music/Disconnect'
import { Skip } from './commands/music/Skip'
import { NowPlaying } from './commands/music/NowPlaying'
import { Pause } from './commands/music/Pause'
import { Resume } from './commands/music/Resume'
import { Queue } from './commands/music/Queue'

export const Commands: Command[] = [Connect, Disconnect, Search, Play, Skip, NowPlaying, Pause, Resume, Queue]