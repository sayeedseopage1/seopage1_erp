/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [];
    

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    // Here, we remove 'Subscript' and 'Superscript' buttons.
    config.removeButtons = 'Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    // Enable the features you listed:

    // 1. Text formatting (bold, italic, underline, strikethrough, subscript, superscript, etc.)
    config.toolbarGroups.push({ name: 'basicstyles', groups: [ 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript' ] });

    // 2. Font selection and size
    config.toolbarGroups.push({ name: 'other', groups: [ 'Font', 'fontSize' ] });

    // 3. Text color and Highlight color
    config.toolbarGroups.push({ name: 'colors', groups: [ 'TextColor', 'BGColor' ] });

    // 4. Alignment of text (left, center, right, justify)
    config.toolbarGroups.push({ name: 'paragraph', groups: [ 'left' ] });

    // 5. Lists (ordered and unordered)
    config.toolbarGroups.push({ name: 'paragraph', groups: [ 'list' ] });

    // 6. Tables (insertion, deletion, editing, and formatting)
    config.toolbarGroups.push({ name: 'insert', groups: [ 'table' ] });

    // 7. Links (insertion, editing, and formatting)
    config.toolbarGroups.push({ name: 'insert', groups: [ 'link' ] });

    // 8. Images (insertion, editing, and formatting)
    config.toolbarGroups.push({ name: 'insert', groups: [ 'image' ] });

    // 9. Video embedding
    // CKEditor does not have a built-in video embedding feature.
    // You can use a plugin like 'embedbase' or 'youtube' to add this functionality.

    // 10. Code snippets
    // CKEditor does not have a built-in code snippet feature.
    // You can use a plugin like 'codesnippet' to add this functionality.

    // 11. Spell checking (with optional plugins)
    // config.plugins = 'spellchecker';
	
    config.toolbarGroups.push({ name: 'editing', groups:  [ 'find', 'selection', 'spellchecker' ] });

    // 12. Undo and redo functionality
    config.toolbarGroups.push({ name: 'clipboard', groups: [ 'undo' ] });

    // 13. Copy and paste formatting from other sources
    config.allowedContent = true;

    // 14. Accessibility features (keyboard shortcuts and ARIA labels)
    config.keystrokes = [
        [ CKEDITOR.CTRL + 66 /*B*/, 'bold' ],
        [ CKEDITOR.CTRL + 73 /*I*/, 'italic' ],
        [ CKEDITOR.CTRL + 85 /*U*/, 'underline' ]
        // Add more keyboard shortcuts as needed
    ];

    // 15. Integration with various content management systems (CMS) and web applications
    // CKEditor provides integration plugins for various CMS and web applications.
    // You can include the relevant plugins based on your specific needs.

    // 16. Customizable toolbar with the ability to add or remove features.
    // The toolbarGroups array defined above determines the toolbar layout.
    // You can add or remove features by modifying this array.

    // 17. Uploading files & images
    // CKEditor provides plugins like 'imageupload' and 'fileupload' to handle file and image uploading.
    // You can include these plugins and configure them according to your requirements.
};