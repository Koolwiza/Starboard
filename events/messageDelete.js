const {
    Client,
    Message,
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = async(client, message) => {
    if (!message.id) return;
    let starboardMessage = client.sb.get(`message_${message.id}`)
    if (!starboardMessage) return;

    let channel = client.channels.cache.get(starboardMessage.channel)
    let foundStarboardMessage = await channel.messages.fetch(starboardMessage.message)

    foundStarboardMessage.delete()
}