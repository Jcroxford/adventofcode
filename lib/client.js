const fetch = require('node-fetch')

class Client {
  BASE_URL = 'https://adventofcode.com'

  constructor(sessionToken) {
    this.sessionToken = sessionToken
  }

  getDayinput(year, day) {
    return this.makeRequest(`${year}/day/${day}/input`)
  }

  makeRequest(url, { url: method = 'get' } = {}) {
    return fetch(
      `${this.BASE_URL}/${url}`,
      {
        method,
        credentials: 'include',
        headers: {
          cookie: `session=${this.sessionToken}`
        }
      }
    )
      .then(res => res.text())
  }
}

module.exports = { Client }
