import _uuid from 'node-uuid'
import moment from 'moment'

export function uuid() {
  return _uuid.v1()
}

export function dateFromat() {
  return moment().format()
}
