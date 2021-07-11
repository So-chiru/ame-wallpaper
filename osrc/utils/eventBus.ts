import uuid from './uuid'

interface eventBusEventsCollection {
  cb: Record<string, eventBusEvent>
  __date: number
}

interface eventBusEvent {
  func: Function
  once: boolean | undefined
  id: string
}

interface eventBusOptions {
  once: boolean
}

export default class eventBus {
  events: Record<string, eventBusEventsCollection>

  constructor () {
    this.events = {}
  }

  emit (event: string, ...args: any[]) {
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

  on (event: string, callback: Function, options?: eventBusOptions) {
    if (!event) {
      throw new Error('event is not defined. please specify in argument 1.')
    }

    if (!this.events[event]) {
      this.events[event] = {
        cb: {},
        __date: Date.now()
      }
    }

    let id = uuid()

    this.events[event].cb[id] = {
      once: options && options.once,
      func: callback,
      id
    }

    return id
  }

  off (event: string, id: string) {
    if (!event) {
      throw new Error('event is not defined. please specify in argument 1.')
    }

    if (!this.events[event]) {
      throw new Error('Given event is not exists.')
    }

    delete this.events[event].cb[id]
  }
}
