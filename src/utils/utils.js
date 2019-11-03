class Utils {

  getRandomElement(elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  }
}

module.exports = new Utils();