class Station {
  constructor(fromObj) {
    for (k in fromObj) {
      this[k] = fromObj[k]
    }
  }
}

class Vehicle {
  constructor(fromObj) {
    for (k in fromObj) {
      this[k] = fromObj[k]
    }
  }
}

module.exports = Station, Vehicle