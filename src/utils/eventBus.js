const uuid = require('./uuid')

class eventBus {
  constructor () {
    this.events = {}
  }

  emit (event, ...args) {
    if (!event) {
      throw new Error('event is not defined. please specify in argument 1.')
    }

    if (!this.events[event]) {
      throw new Error(
        `Event ${event} is not exists. you must define callback first.`
      )
    }

    let event_obj = this.events[event]

    let event_key = Object.keys(event_obj.cb)
    let event_klen = event_key.length

    for (var i = 0; i < event_klen; i++) {
      let cb = event_obj.cb[event_key[i]]
      cb.func(...args)

      if (cb.once) {
        this.off(event, cb.id)
      }
    }
  }

  on (event, callback, options) {
    if (!event) {
      throw new Error('event is not defined. please specify in argument 1.')
    }

    if (!this.events[event]) {
      this.events[event] = {
        cb: [],
        __date: Date.now()
      }
    }

    let id = uuid()

    this.events[event].cb[id] = {
      once: options && options.once,
      func: callback
    }

    return id
  }

  off (event, id) {
    if (!event) {
      throw new Error('event is not defined. please specify in argument 1.')
    }

    if (!this.events[event]) {
      throw new Error('Given event is not exists.')
    }

    delete this.events[event].cb[id]
  }
}

module.exports = eventBus
