# Catkiller

Catkiller is a work-in-progress multi-purpose Discord bot written in Typescript using [discord.js](https://discord.js.org/)

## Features
### Music
- **Providers**: Youtube
- **Commands**: ![](https://imgur.com/a/7DMV1ll)

### And more to come!

## Dependencies
- [discord.js](https://discord.js.org/) - Interacting with the Discord API
- [@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice) - Playing audio in voice channels
- [dotenv](https://www.npmjs.com/package/dotenv) - Loading environment variables from a `.env` file
- [youtube-search-without-api-key](https://www.npmjs.com/package/youtube-search-without-api-key) - Searching videos on YouTube
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) - Downloading YouTube videos' audio

## Usage
1. Create your bot application on the [Discord Developer Portal](https://discord.com/developers/applications) and get its token
2. Create a `.env` file at the root of the directory containing the following environment variables:
```
TOKEN={your_bot_token}
STATUS_TEXT={your_bot_status}
STATUS_TYPE=LISTENING (only LISTENING is supported for now)
```

3. Start the bot with `yarn start`.

4. After adding your bot to your server from the [Discord Developer Portal](https://discord.com/developers/applications) (OAuth2 -> URL Generator), type `/` to display the supported commands and use them.

## License
[MIT](https://choosealicense.com/licenses/mit/)