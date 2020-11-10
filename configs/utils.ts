/* eslint-disable */
// 对象转数组
export const dictToArray = (dict: Record<string, any>): Array<any> =>
  Object.keys(dict).map(name => dict[name])

export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text),
}
