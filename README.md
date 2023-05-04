# OpenAI Chat Discord Bot

A discord.js bot that uses the OpenAI API to be able to respond to users that mention the bot in a message.

The script outputs the amount of tokens used every time an OpenAI request is made. The max_tokens per request can be changed by setting it to a different int (default is 512). It also keeps track of total tokens used per session of the script running.
## External Libraries

- OpenAI
- Discord.js
## Installation

Clone the repository

```bash
git clone https://github.com/ImDarkTom/OpenAIBot .
```
    
Set up .env file with your bot's token and OpenAI API key
```bash
TOKEN = Bot Token
OPENAI_KEY = OpenAI Key
```

Run the bot
```bash
node .\src\index.js
```
or
```bash
node .
```
## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
