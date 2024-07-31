import linkifyHtml from 'linkify-html';
// const urlPattern = /(?:https?:\/\/[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)(?![^<]*<\/a>)/g;

// export function formatHttp(text) {
//   const formattedText = text?.replace(urlPattern, (url) => {
//     const displayText = url.length > 50 ? 'View Link' : url;
//     if (!/<a\s+href\s*=\s*(?:(['"])(?:.*?)\1|([^\s>]+))(?=[^>]*?>)/i.test(url)) {
//       return `<a href="${url}" target="_blank">${displayText}</a>`;
//     }
//     return <a href={url || '#'} target="_blank">{displayText}</a>;
//   });
//   return formattedText;
// }

function cleanUpMalformedAnchors(text) {
  return text.replace(/<a\s+href="([^"]+)"[^>]*>([^<]*<a\s+href="[^"]+"[^>]*>[^<]*<\/a>[^<]*)<\/a>/gi, (match, p1, p2) => {
    return `<a href="${p1}" target="_blank">${p1}</a>`;
  });
}

export function formatHttp(text) {
  if (!text) return text;

  // Clean up malformed anchor tags
  let cleanedText = cleanUpMalformedAnchors(text);

  // Convert only plain text URLs to anchor tags
  const options = {
    defaultProtocol: 'https',
    target: '_blank',
    validate: {
      url: (value) => {
        // Skip URLs already wrapped in anchor tags
        const urlPattern = new RegExp(`href="${value}"`, 'i');
        return !urlPattern.test(cleanedText);
      },
    },
  };

  // Convert plain text URLs to anchor tags
  let formattedText = linkifyHtml(cleanedText, options);

  // Replace inner text of anchor tags if it exceeds 50 characters
  // this characters limit remove for as requested by the Top Management 
  formattedText = formattedText.replace(/<a\s+href="([^"]+)"[^>]*>([^<]{51,})<\/a>/gi, (match, p1) => {
    return `<a href="${p1}" target="_blank">${p1}</a>`;
  });

  return formattedText;
}


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