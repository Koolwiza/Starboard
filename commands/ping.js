const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "Sends the client ping",

    /**
     * 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @param {Discord.Client} client 
     */

    execute: async function(message, args, client) {
        let msg = await message.channel.send(`Pinging...`);
        msg.edit(`Message Latency: ${msg.createdTimestamp - message.createdTimestamp}ms\nClient Latency: ${client.ws.ping}`)
    }
}