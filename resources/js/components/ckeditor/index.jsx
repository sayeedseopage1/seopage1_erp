import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';  
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ImageUploadAdapterPlugin from './custom/ImageUploadAdapter';

export default function CKEditorComponent (){
    const [editor, setEditor] = React.useState(null);

    return (
        <>
            <CKEditor
                onReady={editor => {
                    console.log('Editor is Ready to use!', editor);
                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );

                    setEditor(editor);
                }}

                onError={ ( error, { willEditorRestart } ) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The `onReady` callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if ( willEditorRestart ) {
                        this.editor.ui.view.toolbar.element.remove();
                    }
                } }
                onChange={ ( event, editor ) => console.log( { event, editor } ) }
                editor={ DecoupledEditor }
                data="<p>Hello from CKEditor 5's decoupled editor!</p>"
                config={{
                     toolbar: [ 
                        'undo','redo', 
                        '|',
                        'heading', 
                        '|', 
                        'bold', 'italic', {label: 'More basic styles', icon: 'threeVerticalDots', items: ["underline","strikethrough", "blockQuote","fontsize","fontColor","fontBackgroundColor"]},
                        '|', 
                          'bulletedList', 'numberedList', 'alignment',
                        '|', 
                        'link', 'imageUpload', 'mediaEmbed', 'insertTable',  
                        "|",  
                        'indent', 'outdent',
                     ],

                     image:{
                        toolbar:["imageStyle:inline","imageStyle:block","imageStyle:side","|","toggleImageCaption","imageTextAlternative", "ImageResize"]
                    },
                    table:{
                        contentToolbar:["tableColumn","tableRow","mergeTableCells"]
                    },
        
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                        ]
                    },

                    extraPlugins: [ImageUploadAdapterPlugin]
                }}
            />
        </>
    )
}