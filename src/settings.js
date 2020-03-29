const eventBus = require('./utils/eventBus')

let events = new eventBus()

window.wallpaperPropertyListener = {
  applyGeneralProperties: prop => {
    events.emit('change', prop)
  },
  applyUserProperties: prop => {
    events.emit('changeuser', prop)
  }
}

module.exports = {
  events
}
