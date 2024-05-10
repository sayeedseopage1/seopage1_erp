const urlPattern = /(?:https?:\/\/[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)(?![^<]*<\/a>)/g;

export function formatHttp(text) {
  const formattedText = text.replace(urlPattern, (url) => {
    if (!/<a\s+(?:[^>]*?\s+)?href\s*=\s*(?:(['"])(?:.*?)\1|([^\s>]+))(?=[^>]*?>)/i.test(url)) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    }
    return url;
  });
  return formattedText;
}
