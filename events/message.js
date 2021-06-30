const {
    Client,
    Message
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = (client, message) => {
    if (!message.guild) return;

    let sb = client.sb.ensure(message.guild.id, {
        channel: "",
        count: client.config.defaultAmount
    })

    let args = message.content.slice(client.config.prefix.length).trim().split(/\s+/g)
    let commandName = args.shift().toLowerCase()

    if (message.content.startsWith(client.config.prefix)) {
        let command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName))
        if (command) command.execute(message, args, client, sb)
    }
}