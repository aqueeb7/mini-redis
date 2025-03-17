class PubSub {
  constructor() {
    this.channels = new Map()
  }

  subscribe(channel, socket) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, [])
    }
    this.channels.get(channel).push(socket)
  }

  publish(channel, message) {
    if (this.channels.has(channel)) {
      this.channels.get(channel).forEach((socket) => {
        socket.write(`Message received: ${message}`)
      })
    }
  }
}

module.exports = PubSub