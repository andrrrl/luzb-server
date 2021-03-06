/**
 * In-memory luz store.
 * For demo purposes, gets the logger injected.
 */
export default function createLuzStore(logger) {
  let __luz = ['on', 'off']
  const path = require('path')
  const spawn = require('child_process').spawn

  return {
    async find() {
      logger.debug('Finding luz')
      return [__luz]
    },

    async get(option) {
      logger.debug(`Getting todo with option ${option}`)
      const found = __luz.find(x => x === option.toString())
      if (!found) {
        return null
      }

      let luz = spawn(path.join(__dirname, '../luzb/luz'), [option])

      luz.on('exit', function(code, signal) {
        console.log(
          'child process exited with ' + `code ${code} and signal ${signal}`
        )
      })
      return {
        found
      }
    },

    async status() {
      return 'No option selected'
    }
  }
}
