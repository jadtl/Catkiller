import { Command } from './Command'

import { Test } from './commands/Test'
import { Connect } from './commands/Connect'
import { Play } from './commands/Play'

export const Commands: Command[] = [Connect, Play]