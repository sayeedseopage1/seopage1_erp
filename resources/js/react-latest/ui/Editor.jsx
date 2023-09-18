import React from 'react'
import CKEditorComponent from './ckeditor'
import styles from './editor.module.css'

const Editor = ({className,...props}) => {
  return (
    <div className={`ck-editor-wrapper ${styles.editor} ${className}`}>
        <CKEditorComponent {...props}/>
    </div>
  )
}

export default Editor