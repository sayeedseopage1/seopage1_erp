const urlPattern = /(?:https?:\/\/[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)(?![^<]*<\/a>)/g;

export function formatHttp(text) {
  const formattedText = text?.replace(urlPattern, (url) => {
    if (!/<a\s+href\s*=\s*(?:(['"])(?:.*?)\1|([^\s>]+))(?=[^>]*?>)/i.test(url)) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    }
    return url;
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