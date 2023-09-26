import React, { useState } from "react";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Editor from "../../ui/Editor";
import Modal from "../../ui/Modal";
import styles from '../../styles/revision-page.module.css';
import { useSaleRevisionActionMutation } from "../../services/api/SingleTaskPageApi";
import { toast } from "react-toastify";

const SaleActionButton = ({row, table}) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [comment, setComment] = useState('');
    const [err, setErr] = useState(null);


    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    const [
        saleRevisionAction,
        {isLoading}
    ] = useSaleRevisionActionMutation();
        

    const handleSubmit = (e , type) => {
        e.preventDefault();
        if(comment == ''){
           toast.warn(`You have to explaine the reason!`, {
                autoClose: 1000
           }) 

         setErr({
            comment: 'You have to explaine the reason!'
          })

          return;
        }

        try{
            let res = saleRevisionAction({
                sale_comment: comment,
                action_type: type,
                revision_id: row.id,
            })

            if(res){
                close();
            }
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className="d-flex align-items-center">
            <Button
                size="sm"
                variant="success"
                onClick={toggle}
                className="py-1 font-weight-normal mr-1"
            >
                Accept
            </Button>

            <Button
                size="sm"
                variant="danger"
                onClick={toggle}
                className="py-1 font-weight-normal"
            >
                Deny
            </Button>

            <React.Fragment>
                 <Modal isOpen={isOpen} closeModal={close} className="bg-transparent">
                    <div className="pt-3">
                        <Card>
                            <Card.Head onClose={close}>Revison review</Card.Head>
                            <Card.Body style={{width: '540px'}}>
                                <div>
                                    <p> <span className="text-danger">Reson : </span> {row?.revision_acknowledgement} </p>
                                    <div className={styles.pm_comment} dangerouslySetInnerHTML={{__html: row?.pm_comment}} />
                                </div>


                                <label htmlFor="" className="font-weight-bold mb-2"> ## Please explaine here! <sup>*</sup></label>
                                <Editor
                                    data={comment}
                                    onChange={(_event, editor) => {
                                        const data = editor.getData();
                                        console.log(data)
                                        setComment(data);
                                    }}
                                />
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={close} variant="tertiary" className="font-weight-normal mr-auto"> Close</Button>
                                <Button 
                                    variant="danger" 
                                    onClick={e => handleSubmit(e, 'deny')} 
                                    className="font-weight-normal"
                                    isLoading={isLoading}
                                > 
                                    Deny 
                                </Button>
                                <Button 
                                    variant="success" 
                                    onClick={e => handleSubmit(e, 'accept')} 
                                    className="font-weight-normal"
                                > 
                                    Accept 
                                </Button>
                            </Card.Footer>
                        </Card>  
                    </div>
                 </Modal>
            </React.Fragment>
        </div>
    );
};

export default SaleActionButton;
