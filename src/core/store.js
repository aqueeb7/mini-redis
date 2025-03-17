class MiniRedis {
  constructor() {
    this.store = new Map()
    this.expiry = new Map()
  }

  set(key, value, ttl = 0) {
    this.store.set(key, value)
    if (ttl > 0) {
      const expireAt = Date.now() + ttl * 1000
      this.expiry.set(key, expireAt)
      setTimeout(() => this.deleteIfExprired(key), ttl * 1000)
    }
  }

  get(key) {
    if (this.isExpired(key)) return null
    return this.store.get(key) || null
  }

  isExpired(key) {
    if (this.expiry.has(key) && Date.now() > this.expiry.get(key)) {
      this.store.delete(key)
      this.expiry.delete(key)
      return true
    }
    return false
  }
}

module.exports = MiniRedis
