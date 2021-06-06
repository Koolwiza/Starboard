module.exports = {
    name: "clear",
    execute: function(message, args, client) {
        client.sb.clear()
    }
}