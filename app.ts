import { Server } from 'http'
import { print } from 'configs/utils'
import Environment from 'configs/environments'
import createKoaServer from 'configs/application'
import * as bootstrap from 'configs/bootstrap'
import {createServer} from "http"
import createSocket from "./app/socket"


module.exports = (async (): Promise<Server> => {
  try {
    const app = await createKoaServer()
    const server = createServer(app.callback())
    createSocket(server)
    return server.listen(Environment.port, () => {
      print.log(
        `server listening on ${Environment.port}, in ${Environment.identity} mode.`,
      )
      bootstrap.after()
    })
  } catch (e) {
    /* eslint-disable */
    console.log(e)
  }
})()
