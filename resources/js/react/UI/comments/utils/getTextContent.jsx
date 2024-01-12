import React from "react";

export default function getTextContent(element) {
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
}

export function htmlToString(html) {
    const tag = document.createElement("div");
    tag.innerHTML = html;
    const text = tag.textContent;
    return text || "";
}

export function htmlToPreservedText(comment) {
    // Function to recursively extract text content from HTML nodes
    const extractTextContent = (node) => {
        let text = "";
        node.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
                // Text node
                text += child.textContent.trim();
            } else if (child.nodeType === 1) {
                // Element node
                text += extractTextContent(child);
            }
        });
        return text;
    };

    // const tags = html.split("<br>");
    const tag = document.createElement("div");
    tag.innerHTML = comment;

    const resultString = Array.from(tag.childNodes)
        .map((node) => extractTextContent(node) + "\n")
        .join("");

    // console.log(resultString);
    
    return resultString;
}




export function getTrimmedHtml(html){
    const arr = html.split('<p><br></p>');
    let newHtml;
    if (!arr[arr.length-1]) {
      newHtml = arr.slice(0,arr.length-1).join('<p><br></p>');
    }else{
      newHtml = arr.join('<p><br></p>');
    }
    return newHtml;
}




export function getCommentInHtml(comment){
    const commentTag = document.createElement('div');
    commentTag.innerHTML = comment;
    return commentTag;
}