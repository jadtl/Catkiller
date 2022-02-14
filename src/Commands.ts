import { Command } from './Command'

import { Connect } from './commands/Connect'
import { Search } from './commands/Search'
import { Play } from './commands/Play'

export const Commands: Command[] = [Connect, Search, Play]