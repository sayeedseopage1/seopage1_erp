import React from "react";

export default function getTextContent(element){
    // console.log('element type',typeof element);
    // console.log('check isArray',Array.isArray(element));
    // console.log('check isValidElement',React.isValidElement(element));

  if (typeof element === "string") {
      return element;
  }

  if (Array.isArray(element)) {
      return element.map(getTextContent).join("");
  }

  if (React.isValidElement(element)) {
      const children = React.Children.toArray(element.props.children);
      return getTextContent(children);
  }

  return "";
};



export function htmlToString(html){
    const tag = document.createElement('div');
    tag.innerHTML = html;
    const text = tag.textContent;
    return text || "";
}

