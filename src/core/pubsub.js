class PubSub {
  constructor() {
    this.channels = new Map()
  }

  subscribe(channel, callback) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, [])
    }
    this.channels.get(channel).push(callback)
  }

  publish(channel, message) {
    if (this.channels.has(channel)) {
      this.channels.get(channel).forEach((callback) => callback(message))
    }
  }
}

module.exports = PubSub