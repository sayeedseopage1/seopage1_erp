const urlPattern = /(?:https?:\/\/[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)(?![^<]*<\/a>)/g;

export function formatHttp(text) {
  const formattedText = text?.replace(urlPattern, (url) => {
    if (!/<a\s+(?:[^>]*?\s+)?href\s*=\s*(?:(['"])(?:.*?)\1|([^\s>]+))(?=[^>]*?>)/i.test(url)) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    }
    return url;
  });
  return formattedText;
}



export const handleLoadingComponent = (isLoading, loadingComponent, renderDataComponents) => {
  if (isLoading) {
    return loadingComponent;
  } else {
    return renderDataComponents;
  }
}

// export const htmlTagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
export const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;