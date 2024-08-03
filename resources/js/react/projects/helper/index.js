import linkifyHtml from 'linkify-html';

function cleanUpMalformedAnchors(text) {
  return text.replace(/<a\s+href="([^"]+)"[^>]*>([^<]*<a\s+href="[^"]+"[^>]*>[^<]*<\/a>[^<]*)<\/a>/gi, (match, p1, p2) => {
    return `<a href="${p1}" target="_blank">${p1}</a>`;
  });
}

export function formatHttp(text) {
  if (!text) return text;
  let cleanedText = cleanUpMalformedAnchors(text);

  const options = {
    defaultProtocol: 'http', 
    target: '_blank',
    validate: {
      url: (value) => {
        const urlPattern = new RegExp(`href="[^"]*"`, 'i');
        return !urlPattern.test(cleanedText);
      },
    },
    formatHref: (href) => {
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        return `http://${href}`;
      }
      return href;
    },
  };

  let formattedText = linkifyHtml(cleanedText, options);
  return formattedText;
}

export function addDefaultProtocol(url) {
  if (!/^https?:\/\//i.test(url) && !/^www\./i.test(url)) {
    return `http://${url}`;
  }
  return url;
}



export const isLink = (str) => {
  if (!/^https?:\/\//i.test(str) && !/^www\./i.test(str)) {
    str = `http://${str}`;
  }
  if (/^www\./i.test(str)) {
    str = `http://${str}`;
  }
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};




/**
 * handleLoadingComponent
 * @param {boolean} isLoading - Flag indicating whether the data is currently loading.
 * @param {React.Component} loadingComponent - The component to display while loading.
 * @param {React.Component} renderDataComponents - The component to display once data is loaded.
 * 
 * @returns {React.Component} - Returns the loading component if `isLoading` is true, otherwise returns the rendered data components.
 * @description - Handles the loading state of the component, displaying a loader when the data is loading and the data components when the data has finished loading.
 * 
 * @example
 * const isLoading = true;
 * const loader = <Loader />;
 * const content = <Content />;
 * const element = handleLoadingComponent(isLoading, loader, content);
 */
export const handleLoadingComponent = (isLoading, loadingComponent, renderDataComponents) => {
  if (isLoading) {
    return loadingComponent;
  } else {
    return renderDataComponents;
  }
};


export const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;


export const extractMessageLink = (message) => {
  if (message) {
    return message.split('<br>').map(link => link.trim()).filter(link => link.length > 0);
  } else {
    return []
  }
}