import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';  
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ImageUploadAdapterPlugin from './custom/ImageUploadAdapter'; 



export default function CKEditorComponent ({data="", onChange, placeholder="Type the content here!"}){
    const [isExist, setIsExist] = React.useState(false);

    return (
        <>
            <CKEditor
                onReady={editor => { 

                        editor.ui.view.toolbar.element.remove();
                    
                        editor.ui.getEditableElement()?.parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                      setIsExist(true); 
                }}

                onError={ ( error, { willEditorRestart } ) => {
                    if ( willEditorRestart ) {
                        this.editor.ui.view.toolbar.element.remove();
                    }
                } }
                onChange={ ( event, editor ) => onChange ? onChange(event, editor): null }
                editor={ DecoupledEditor }
                data={data}
                config={{ 
                    extraPlugins: [ImageUploadAdapterPlugin],
                    placeholder,
                    toolbar: [ 
                        'undo','redo', 
                        '|',
                        'heading', 
                        '|', 
                        'bold', 'italic', 
                        {
                            label: 'More basic styles', 
                            icon: 'text', 
                            items: ["underline","strikethrough", "blockQuote", 'alignment', "fontColor"]
                        },
                        '|', 
                        {
                            label: 'List',
                            icon: false,
                            items: ['bulletedList', 'numberedList','indent', 'outdent']
                        },
                        '|', 
                        'link',
                        {
                            label: 'Insert',
                            icon: 'plus',
                            items: ['imageUpload', 'mediaEmbed', 'insertTable']
                        },
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
                }}
            />
        </>
    )
}