import React, { useState } from "react";
import styles from '../../styles/revision-page.module.css';
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Editor from "../../ui/Editor";
import Modal from "../../ui/Modal";

import { useSaleRevisionActionMutation } from "../../services/api/revisionApiSlice";
import Loader from "../../ui/Loader";
import Switch from "../../ui/Switch";

const SaleActionButton = ({row, table}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [err, setErr] = useState(null);

    const clearState = () => {
        setComment('');
        setErr('');
    }

    const toggle = () => {
        setIsOpen(!isOpen);
        clearState();
    };
    const close = () => {setIsOpen(false), clearState()};

    const { isFetching } = table.getState();

    const [
        saleRevisionAction,
        {isLoading}
    ] = useSaleRevisionActionMutation();


    const handleSubmit = async (e , type) => {
        e.preventDefault();
        if(comment == ''){
         setErr({
            comment: 'You have to explain the reason!'
          })

          return;
        }

        try{
            let res = await saleRevisionAction({
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
            {
                (isLoading ) ?
                    <div className="alert alert-warning py-2 px-3 f-14">
                        <Loader />
                    </div>
                : <>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={toggle}
                        className="py-1 font-weight-normal mr-1"
                    >
                        Accept/Deny
                    </Button>
                </>

            }


            <React.Fragment>
                 <Modal isOpen={isOpen} closeModal={close} className="bg-transparent">
                    <div className="pt-3">
                        <Card>
                            <Card.Head onClose={close}>Revision review</Card.Head>
                            <Card.Body style={{width: '540px'}}>
                                <div>
                                    <p> <span className="text-danger">Reason : </span> {row?.revision_acknowledgement} </p>
                                    <div className={styles.pm_comment} dangerouslySetInnerHTML={{__html: row?.pm_comment}} />
                                </div>


                                <label htmlFor="" className="font-weight-bold mb-2"> ## Please explain here! <sup>*</sup></label>
                                <Editor
                                    data={comment}
                                    onChange={(_event, editor) => {
                                        const data = editor.getData();
                                        setComment(data);
                                    }}
                                />

                                {err?.comment && <small><span className="text-danger">{err?.comment}</span></small>}
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={close} variant="tertiary" className="font-weight-normal mr-auto"> Close</Button>
                                <Switch>
                                    <Switch.Case condition={!isLoading && !isFetching}>
                                        <>
                                            <Button
                                                variant="danger"
                                                onClick={e => handleSubmit(e, 'deny')}
                                                className="font-weight-normal"
                                                isLoading={isLoading || isFetching}
                                            >
                                                Deny
                                            </Button>
                                            <Button
                                                variant="success"
                                                onClick={e => handleSubmit(e, 'accept')}
                                                className="font-weight-normal"
                                                isLoading={isLoading || isFetching}
                                            >
                                                Accept
                                            </Button>
                                        </>
                                    </Switch.Case>

                                    <Switch.Case condition={isLoading || isFetching}>
                                        <>
                                            <Button
                                                variant="primary"
                                                className="font-weight-normal"
                                                isLoading={isLoading || isFetching}
                                            >
                                                Loading...
                                            </Button>
                                        </>
                                    </Switch.Case>
                                </Switch>

                            </Card.Footer>
                        </Card>
                    </div>
                 </Modal>
            </React.Fragment>
        </div>
    );
};

export default SaleActionButton;
