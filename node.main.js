const handler = require('./index.js')
const context = require('./config.js')
const event = require('./event.json')
handler.initializer(context.context).then(() => {
  handler.handler(event, context.context, (data) => {
    console.log(data)
  })
})
