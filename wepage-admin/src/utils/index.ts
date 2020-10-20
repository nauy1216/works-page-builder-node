export function uuid() {
  return String(+new Date()) + parseInt("" + Math.random() * 10000);
}

export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function serialize(obj) {
  let str = "";
  if (obj == null || obj == undefined) {
    return str;
  }

  Object.keys(obj).forEach(function(key) {
    str += `${key}=${obj[key]}&`;
  });

  return str.slice(0, -1);
}
