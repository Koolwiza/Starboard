const {
    Client,
    MessageReaction,
    User
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = async(client, reaction, user) => {
    if (reaction.emoji.name !== client.config.reaction) return;
    if (reaction.partial) await reaction.fetch()
    if (reaction.message.partial) await reaction.message.fetch()

    const {
        message
    } = reaction

    client.sb.ensure(message.guild.id, {
        channel: "",
        count: 2
    })

    let data = client.sb.get(`message_${message.id}`)
    if (data) {
        let sbCh = client.channels.cache.get(data.channel)
        let foundMessage = await sbCh.messages.fetch(data.message)
        if (foundMessage) {
            let currentStars = parseInt(foundMessage.content.match(/^💫 \*\*(\d+)\*\* \| .+/)[1])
            return foundMessage.edit(`💫 **${currentStars - 1}** | ${data.url}`, {
                embed: foundMessage.embeds[0]
            })
        }
    } else {
        let values = client.sb.keyArray().map(c => client.sb.get(c))
        let foundMsg = values.find(c => c.starboardMessage === message.id)

        if (foundMsg) {
            let channel = client.channels.cache.get(foundMsg.channel)
            let starboardMessage = await channel.messages.fetch(foundMsg.starboardMessage)

            let currentStars = parseInt(starboardMessage.content.match(/^💫 \*\*(\d+)\*\* \| .+/)[1])
            return starboardMessage.edit(`💫 **${currentStars - 1}** | ${foundMsg.url}`, {
                embed: starboardMessage.embeds[0]
            })
        }
    }

}