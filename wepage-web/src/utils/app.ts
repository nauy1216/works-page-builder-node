export function getAppId() {
  console.log("appId === ", location.pathname.slice(1));
  return location.pathname.slice(1);
}

export function getPageId() {
  console.log("pageId === ", location.hash.replace(/#\/page\//, ""));
  if (location.hash === "#/") return "";
  return location.hash.replace(/^#\/page\//, "");
}
