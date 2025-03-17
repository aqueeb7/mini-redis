const PubSub = require("../core/pubsub")
const pubsub = new PubSub()

module.exports = (store, aof, command) => {
  const parts = command.split(" ")
  const cmd = parts[0].toUpperCase()

  switch (cmd) {
    case "SET":
      if (parts.length >= 3) {
        const ttl = parts.length === 4 ? parseInt(parts[3]) : 0
        store.set(parts[1], parts[2], ttl)
        aof.append(command)
        return "OK"
      }
      return "Usage: SET key value [TTL]"
    case "GET":
      return store.get(parts[1]) || 'nil'

    case "PUBLISH":
      if (parts.length >= 3) {
        pubsub.publish(parts[1], parts.slice(2).join(" "))
        return "Message sent"
      }
      return "Usage: PUBLISH channel message"
    default:
      return "Unknown command"
  }
}