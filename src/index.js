require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

//OpenAI
const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

let sessionUsage = 0;

//Discord
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);

    c.user.setPresence({
        activities: [{ name: `out for mentions`, type: ActivityType.Watching }],
        status: 'online',
    });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) {return;}

    if (message.mentions.users.has(client.user.id)) {
        await message.channel.sendTyping();

        const messageWithoutMention = message.content.slice(client.user.id.length + 4).trim();
        
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `GPT 3 is a friendly chatbot.
            
            GPT 3: Hello, how can I help you?
            ${message.author.username}: ${messageWithoutMention}
            GPT 3:`,
            max_tokens: process.env.MAX_TOKENS
        });

        const usedTokens = response.data.usage.total_tokens;
        sessionUsage += usedTokens;

        console.log(`Made request for ${usedTokens} tokens, session total now ${sessionUsage} tokens.`);

        message.reply(response.data.choices[0].text);
    }
});

client.login(process.env.TOKEN);