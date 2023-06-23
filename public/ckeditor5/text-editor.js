const CKEditor = require('./ckeditor');

var _editor;

        class MyUploadAdapter{
            constructor(loader) {
                this.loader = loader;
            } 
            upload() {
                return this.loader.file
                    .then((file) => {
                        const fd = new FormData();
                        fd.append('image', file);
                        
                        return new Promise((resolve, reject) => {

                            $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                }
                            });

                            $.ajax({
                                url: '/upload',
                                data: fd,
                                type: "POST",
                                processData: false,
                                contentType: false,
                                success: function(data){
                                    console.log({data});
                                    resolve({ default: data?.filename });
                                },
                                error: function(error) {
                                    console.log({error});
                                    reject(error);
                                }
                            });
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            abort() {
                // Implement the abort logic if needed
            }
        }

        function MyUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
                console.log(loader)
                return new MyUploadAdapter(loader);
            };
        } 

        CKEditor.DecoupledEditor
            .create( document.querySelector( '#sp1_task_editor' ),{
            // toolbar: [ 'undo','redo', '|','heading', '|', 'bold', 'italic',"underline","strikethrough",'|', 'link','blockQuote',  'bulletedList', 'numberedList', '|', 'alignment', 'insertTable', '|','imageUpload','mediaEmbed',"|","fontsize","fontColor","fontBackgroundColor","|",  'indent', 'outdent', ],
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
            extraPlugins:[MyUploadAdapterPlugin]
        } ) 
            .then( editor => {
                const toolbarContainer = document.querySelector( '#sp1_task_editor_toolbar' ); 
                toolbarContainer.appendChild( editor.ui.view.toolbar.element ); 
                _editor = editor;
            })
            .catch( error => {
                console.error( error );
            } );


        

    

        