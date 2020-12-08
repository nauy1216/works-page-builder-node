import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Environment from './environments'
import koaStatic from 'koa-static'
import path from "path"

export const useMiddlewares = <T extends Koa>(app: T): T => {
  Environment.identity !== 'test' && app.use(logger())

  app.use(bodyParser())
  app.use(koaStatic(path.resolve(process.cwd(), 'public')));

  return app
}
