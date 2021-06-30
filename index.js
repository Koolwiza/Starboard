const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'USER']
})
const config = require('./config.json')
const {
    readdirSync
} = require('fs')

client.commands = new Discord.Collection()
client.config = config
client.sb = new(require('enmap'))({
    name: "starboard",
    autoFetch: true,
    fetchAll: true,
    ensureProps: true
})

let evtFiles = readdirSync('./events').filter(c => c.endsWith('.js'))

evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
});

let cmdFiles = readdirSync('./commands').filter(c => c.endsWith('.js'))

for (let file of cmdFiles) {
    let command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.login(config.token)