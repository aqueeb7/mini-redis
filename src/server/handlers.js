const PubSub = require("../core/pubsub")
const pubsub = new PubSub()

module.exports = (store, aof, command, socket) => {
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
    case "DEL":
      if (parts.length === 2) {
        store.delete(parts[1]);
        return "OK";
      }
      return "Usage: DEL key";
    case "EXISTS":
      if (parts.length === 2) {
        return store.exists(parts[1]) ? "1" : "0"
      }
      return "Usage: EXISTS key"
    case "PUBLISH":
      if (parts.length >= 3) {
        pubsub.publish(parts[1], parts.slice(2).join(" "))
        return "Message sent"
      }
      return "Usage: PUBLISH channel message"
    case "SUBSCRIBE":
      if (parts.length === 2) {
        pubsub.subscribe(parts[1], socket)
        return `Subscribed to ${parts[1]}`
      }
      return "Usage: SUBSCRIBE channel"
    default:
      return "Unknown command"
  }
}