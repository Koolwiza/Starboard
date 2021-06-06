const {
    Client
} = require('discord.js')

/**
 * 
 * @param {Client} client 
 */

module.exports = (client) => {
    console.clear()
    console.log(`${client.user.username} is online!`)
}