const Discord = require('discord.js');

module.exports = {
    name: "starboard",
    description: "Configure starboard settings",

    /**
     * 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @param {Discord.Client} client 
     */

    execute: async function (message, args, client, {
        channel,
        count
    }) {
        let type = args[0];
        if (!type) return message.channel.send("Please provide a type");

        if (type === "show") {
            return message.channel.send(`**Starboard Channel**: ${channel}\n**Starboard Count**: ${count}`)
        } else if (type === "channel") {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if(!channel) return message.channel.send("Please provide a valid channel")
            client.sb.set(message.guild.id, channel.id, "channel")
            return message.channel.send(`Set channel as ${channel.toString()}`)
        } else if (type === "count") {
            let count = parseInt(args[1])
            if(isNaN(count)) return message.channel.send("Please provide a valid count")
            client.sb.set(message.guild.id, count, "count")
            return message.channel.send(`Set count as \`${count}\``)
        }
    }
}