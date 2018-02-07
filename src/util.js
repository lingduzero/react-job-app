export function getRedirectPath({ type, avatar }) {
  let url = type === "recuriter" ? "/recuriter" : "/consultant";
  if (!avatar) {
    url += "info";
  }
  return url;
}
