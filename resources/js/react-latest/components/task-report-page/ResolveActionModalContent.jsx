import { useState, useEffect } from 'react';
import CKEditorComponent from '../../ui/ckeditor';
import Button from '../../ui/Button';

const ResolveActionModalContent = ({close}) => {
  const [text, setText] = useState('');

  useEffect(()=>{
    console.log(text);
  },[text]);

  const handleResolve = () =>{

    close();
    setText('');
  }

  const handleDeny = () =>{

    close();
    setText('');
  }

  return (
    <div>
      <CKEditorComponent onChange={(e, editor) => setText(editor.getData())} placeholder='Write your comment here!' />
      <section style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
        <Button variant="success" disabled={!text} isLoading={false} onClick={handleResolve}>Resolve Report</Button>
        <Button variant="danger" onClick={handleDeny} >Deny Report</Button>
      </section>
    </div>
  );
};

export default ResolveActionModalContent;