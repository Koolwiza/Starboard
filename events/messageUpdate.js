const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} oldMessage 
 * @param {Message} newMessage 
 * @returns 
 */

module.exports = async(client, oldMessage, newMessage) => {
    if (oldMessage.partial) await oldMessage.fetch()
    if (newMessage.partial) await newMessage.fetch()

    let starboardMessage = client.sb.get(`message_${newMessage.id}`)
    if (!starboardMessage) return;

    let channel = client.channels.cache.get(starboardMessage.channel)
    let foundStarboardMessage = await channel.messages.fetch(starboardMessage.message)

    if (newMessage.embeds.length) {
        let embed = newMessage.embeds[0]
        embed.color = "#fbc410"
        embed.author = {
            name: newMessage.author.username,
            iconURL: newMessage.author.displayAvatarURL()
        }

        embed.footer = {
            text: `ID: ${newMessage.author.id}`
        }

        embed.timestamp = new Date()
        await foundStarboardMessage.edit(foundStarboardMessage.content, {
            embed
        })
    }

    let embed = new MessageEmbed()
        .setColor("#fbc410")
        .setDescription(newMessage.content)
        .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
        .setFooter(`ID: ${newMessage.author.id}`)
        .setTimestamp()

    if (newMessage.attachments.size) {
        embed.setImage(newMessage.attachments.first().proxyURL)
    }

    foundStarboardMessage.edit(embed)
}