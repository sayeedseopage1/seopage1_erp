import * as React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// editor
import {
    EditorState,
    convertToRaw,
    RichUtils,
    getDefaultKeyBinding,
    Modifier,
} from "draft-js";

// plugins
import {
    plugins,
    linkPlugin,
    EmojiSuggestions,
    EmojiSelect,
    mentionFilter,
    mentionPlugin,
    toolbarPlugin,
} from "./editor.plugins";
import draftToHtml from "draftjs-to-html";
import AnchorModal from "./AnchorModal";

const { Toolbar } = toolbarPlugin;

// context
const EditorContext = React.createContext(null);

const ServiceProvider = ({ children }) => {
    const [files, setFiles] = React.useState([]);

    // mention
    const { MentionSuggestions } = React.useMemo(() => {
        const { MentionSuggestions } = mentionPlugin;
        return { MentionSuggestions };
    }, []);

    // handle upload image
    // user upload button click
    const handleUploadImage = (e) => {
        const uploadedFiles = e.target.files;
        setFiles((prev) => [...prev, ...uploadedFiles]);
    };

    // remove image form list
    const handleRemoveImage = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    // handle link
    const handleLinkButton = (editorState, setEditorState) => {
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const selectedContent = contentState
            .getBlockForKey(selection.getStartKey())
            .getText()
            .slice(selection.getStartOffset(), selection.getEndOffset());

        const callback = (url, text) => {
            // update state
            const contentStateWithEntity = contentState.createEntity(
                "LINK",
                "MUTABLE",
                { url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            // Replace the selected text with the link
            const newContentState = Modifier.replaceText(
                contentState,
                selection,
                text,
                editorState.getCurrentInlineStyle(),
                entityKey
            );

            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "insert-characters"
            );

            const selectionWithLink = newEditorState.getSelection().merge({
                anchorOffset: selection.getStartOffset() + url.length,
                focusOffset: selection.getStartOffset() + url.length,
            });

            setEditorState(
                RichUtils.toggleLink(
                    newEditorState,
                    selectionWithLink,
                    entityKey
                )
            );

            // close modal
            Swal.close();
        };

        // anchor text insert modal
        withReactContent(Swal).fire({
            html: (
                <AnchorModal
                    selectedText={selectedContent}
                    callback={callback}
                />
            ),
            showConfirmButton: false,
            showCloseButton: true,
        });
    };

    // render with hight quality emoji
    const replaceEmojiWithHighQualityEmoji = (html) => {
        // Use the spread operator to split the string into an array of characters
        var characters = [...html];

        // Map each character and check if it's an emoji
        var convertedText = characters.map(function (char) {
            // Check if the character is an emoji
            if (char.length > 1) {
                return Array.from(char)
                    .map(function (emojiChar) {
                        let emoji = emojiChar.codePointAt(0).toString(16);
                        let url = `https://cdn.jsdelivr.net/joypixels/assets/7.0/png/unicode/128/${emoji}.png`;
                        return `<img src=${url} style="width: 1em; height: 1em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;">`;
                    })
                    .join("");
            } else {
                // If it's not an emoji, keep the character unchanged
                return char;
            }
        });

        // Join the array back into a string
        return convertedText.join("");
    };

    // custom key binding
    const customKeyBindingFn = (e) => {
        if (e.keyCode === 13 && !e.nativeEvent.shiftKey) {
            return "send_comment";
        }
        return getDefaultKeyBinding(e);
    };

    // render control
    const renderToHtml = (editorState) => {
        // hash config
        const hashConfig = {
            trigger: "#",
            separator: " ",
        };

        // styled mention 
        const customEntityTransform = (entity, text) => { 
            if (entity.type === "mention") {
                return `<span class="comment-mention" style="font-family:cursive;color:#0f79dd;">${text}</span>`;
            }
        };

        const plainText = editorState.getCurrentContent().getPlainText();

        if(!plainText) return '';

        // get row data
        const rowData = convertToRaw(editorState.getCurrentContent());
         
        // markup
        const markup = draftToHtml(
            rowData,
            hashConfig,
            true,
            customEntityTransform
        ); 
        return replaceEmojiWithHighQualityEmoji(markup);
    };

    // on files paste
    const handlePastedFiles = (files) => {
        setFiles(prev => ([...prev, ...files]))
    }

    // clear files
    const clearFiles = () => {
        setFiles([])
    }

    return (
        <EditorContext.Provider
            value={{
                plugins,
                EmojiSuggestions,
                EmojiSelect,
                files,
                handleUploadImage,
                handleRemoveImage,
                customKeyBindingFn,
                handleLinkButton,
                renderToHtml,
                MentionSuggestions,
                mentionFilter,
                handlePastedFiles,
                Toolbar,
                clearFiles
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export default ServiceProvider;

export const useEditor = (editor) => React.useContext(EditorContext);
