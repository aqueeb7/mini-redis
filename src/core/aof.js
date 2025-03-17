const fs = require('fs')
const path = require('path')

class AOF {
  constructor(filePath) {
    this.filePath = filePath || path.join(__dirname, "../../data/dump.aof")
  }

  append(command) {
    fs.appendFileSync(this.filePath, command + "\n")
  }

  load(storeInstance) {
    if (!fs.existsSync(this.filePath)) return

    const commands = fs.readFileSync(this.filePath, "utf-8").split("\n")
    commands.forEach((cmd) => {
      if (cmd.trim()) {
        const parts = cmd.split(" ")
        if (parts[0] === "SET") {
          const [_, key, value, ttl] = parts
          storeInstance.set(key, value, parseInt(ttl) || 0)
        }
      }
    })
  }
}

module.exports = AOF