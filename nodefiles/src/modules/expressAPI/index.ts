const express = require('express')
var birds = require('./routes/birds')

class App {
  public express

  constructor () {
    this.express = express()
    this.express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    
    this.express.use('/birds', birds)
  }
}

module.exports={
  App
}