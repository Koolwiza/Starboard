const {
    Client,
    MessageReaction,
    User,
    MessageEmbed,
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

    let {
        message
    } = reaction

    let data = client.sb.ensure(message.guild.id, {
        channel: "",
        count: 2
    })

    if (!data.channel) return;
    let count = data.count
    let reactions = reaction.count
    let channel = message.guild.channels.cache.get(data.channel)

    if (reactions >= count) {

        try {
            let msgId = client.sb.get(`message_${message.id}`).starboardMessage
            let gotMessage = await channel.messages.fetch(msgId)
            gotMessage.edit(gotMessage.content = `💫 **${reactions}** | ${message.url}`, {
                embeds: gotMessage.embeds[0]
            })
        } catch (e) {
            let arrayOfStarboard = client.sb.keyArray().map(c => client.sb.get(c))
            let foundMessage = arrayOfStarboard.find(c => c.starboardMessage === message.id)
            if (foundMessage) {
                let channel = client.channels.cache.get(foundMessage.channel)
                let starboardFoundMessage = await channel.messages.fetch(foundMessage.starboardMessage)
                if (!starboardFoundMessage.id) return;
                let currentStars = parseInt(starboardFoundMessage.content.match(/^💫 \*\*(\d+)\*\* \| .+/)[1])

                return starboardFoundMessage.edit(`💫 **${currentStars + 1}** | ${foundMessage.url}`, {
                    embed: starboardFoundMessage.embeds[0]
                })
            }
            if (message.embeds.length) {
                let embed = message.embeds[0]
                embed.color = "#fbc410"
                embed.author = {
                    name: message.author.username,
                    iconURL: message.author.displayAvatarURL()
                }

                embed.footer = {
                    text: `ID: ${message.author.id}`
                }

                embed.timestamp = new Date()
                let sentMsg = await channel.send(`💫 **${reactions}** | ${message.url}`, {
                    embed
                })

                return client.sb.set(`message_${message.id}`, {
                    starboardMessage: sentMsg.id,
                    channel: channel.id,
                    url: message.url,
                    message: message.id
                })
            }

            let embed = new MessageEmbed()
                .setColor("#fbc410")
                .setDescription(message.content)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter(`ID: ${message.author.id}`)
                .setTimestamp()

            if (message.attachments.size) {
                embed.setImage(message.attachments.first().proxyURL)
            }

            let sentMsg = await channel.send(`💫 **${reactions}** | ${message.url}`, {
                embed
            })

            client.sb.set(`message_${message.id}`, {
                starboardMessage: sentMsg.id,
                channel: channel.id,
                url: message.url,
                message: message.id
            })
        }
    }
}