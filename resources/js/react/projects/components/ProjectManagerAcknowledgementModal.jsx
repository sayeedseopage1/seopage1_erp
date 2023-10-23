import React from "react";
import styles from "./project-manager-acknowledgement.module.css";
import Modal from "../../global/Modal";
import Card from "../../global/Card";
import Button from "../../global/Button";
import _ from "lodash";


const ProjectManagerAcknowledgementModal = ({
    onConfirm,
    onClose,
    isOpen,
    isLoading,
}) => {
    const [loading, setIsLoading] = React.useState(false);
    const [acknowledgement, setAcknowledgement] = React.useState(null);
    const [subAcknowledgement, setSubAcknowledgement] = React.useState(null);
    const [visible, setIsVisible] = React.useState(false);

    const handleChange = (e, data) => {
        setAcknowledgement(data);
    };

    const handleSubChange = (e, data) => {
        setSubAcknowledgement(data);
    };

    const handleOnConfirm = (e) => {
      e.preventDefault();
      setIsLoading(true);

      onConfirm({
        acknowledgement: acknowledgement.text,
        subAcknowledgement:visible ? subAcknowledgement?.text : '',
        authorization: acknowledgement.authorization
      })
      setIsLoading(false)
      close();
    }

    const close = () => {
        setAcknowledgement(null);
        setSubAcknowledgement(null);
        setIsVisible(false);
        onClose();
    }

    return (
        <React.Fragment>
            <Modal isOpen={isOpen}>
                <div className={styles.modal_container}>
                    <Card className={styles.card}>
                        <Card.Head
                            onClose={close}
                            className={styles.card_header}
                        >
                            <span>&nbsp;</span>
                        </Card.Head>
                        <Card.Body className={styles.card_body}>
                            <h5>Do you understand the following things?</h5>
                            <ol className={styles.order_list}>
                                <li>
                                    It is your job to decide the look and feel of a website based on a few reference websites.
                                </li>
                                <li>
                                It is your job to research a theme based on the overall direction given by the client. 
                                </li>
                                <li>
                                It is your job to research a plugin based on the overall direction given by the client. 
                                </li>
                                <li> It is your job to choose the color scheme of a website. </li>
                                <li>
                                It is your job to talk to the support. Example: Shopify support team, theme support, plugin support and any other support for any solution. 
                                </li>
                                <li>
                                It is your responsibility to either create tutorials or find them on YouTube as per the client's requirements that you received during or after project completion.
                                </li>
                                <li>
                                You understand that the particulars mentioned above are vital for a project's success. Since the technical team does not have direct client interaction, assigning these responsibilities to developers indicates neglecting your core duties and not caring about the project's fate.
                                </li>
                            </ol>

                            <p className="ml-2">
                            In general, anything that has to do with the defined requirements (of any sort) has to be done by you. The developer's job is to execute the work based on the defined requirements (In granular level). 
                            </p>

                            <p className="ml-2">
                            If for any reason you need developers assistance regarding any of the above things, you will have to create a separate task for each of them, and those tasks have to be authorized by the top management mandatorily. 
                            </p>

                            <p className="ml-2">
                            If you assign any of the above things as a regular task and if the technical team complains/files a report, you will receive some negative performance points after verification.
                            </p>

                            <div className={styles.footer_label}>
                                # Based on the above concept, please select one of the options below:
                            </div>
                            <div className={styles.form_group}>

                                <div className={styles.radio_group}>
                                    <input
                                        type="radio"
                                        name="statement"
                                        value="This is a regular task that should be done by the developer team"
                                        onChange={ e => {
                                          setIsVisible(false);
                                          handleChange(e, {
                                          text: "This is a regular task that should be done by the developer team",
                                          authorization: false,
                                        })}}
                                    />
                                    <label>
                                        This is a regular task that should be done by the developer team
                                    </label>
                                </div>

                                <div className={styles.radio_group}>
                                    <input
                                        type="radio"
                                        name="statement"
                                        value="This is by default my work but I still want to send this to the technical team for the following reasons:"
                                        onChange={e => {
                                          setIsVisible(true);
                                          handleChange(e, {
                                            text: 'This is by default my work but I still want to send this to the technical team for the following reasons:',
                                            authorization: true,
                                          })
                                        }}
                                    />
                                    <label>
                                    This is by default my work but I still want to send this to the technical team for the following reasons:
                                    </label>
                                </div>


                                  <div className="pl-3 mt-2">
                                      <div className={styles.radio_group}>
                                          <input
                                              type="radio"
                                              disabled={!visible}
                                              name="subStatement"
                                              value="This is too technical for me"
                                              onChange={e =>  handleSubChange(e, {
                                                text: "This is too technical for me",
                                                authorization: true,
                                              })}
                                          />
                                          <label>
                                                This is too technical for me.
                                          </label>
                                      </div>

                                      <div className={styles.radio_group}>
                                          <input
                                              type="radio"
                                              disabled={!visible}
                                              name="subStatement"
                                              value="I don’t understand what the client said and I believe the developers will be able to understand"
                                              onChange={e =>  handleSubChange(e, {
                                                text: " I don’t understand what the client said and I believe the developers will be able to understand",
                                                authorization: true,
                                              })}
                                          />
                                          <label>
                                            I don’t understand what the client said and I believe the developers will be able to understand.
                                          </label>
                                      </div>
                                  </div>

                            </div>

                        </Card.Body>

                        <Card.Footer className={styles.card_footer}>
                            <div className={styles.button_group}>
                                <Button variant="tertiary" onClick={close}>
                                    Cancel
                                </Button>
                                <Button
                                    isLoading={isLoading || loading}
                                    onClick={handleOnConfirm}
                                    disabled={!(visible ? (acknowledgement && subAcknowledgement) : acknowledgement)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default ProjectManagerAcknowledgementModal;
