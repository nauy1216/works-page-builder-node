export function uuid() {
    return String(+new Date()) + parseInt("" + Math.random() * 10000)
}