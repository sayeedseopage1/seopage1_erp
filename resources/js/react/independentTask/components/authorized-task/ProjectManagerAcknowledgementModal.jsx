import React from "react";
import styles from "./project-manager-acknowledgement.module.css";
import _ from "lodash";
import Modal from "../Modal";
import Card from "../../../global/Card";
import Button from "../Button";


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
                            <h5>Do you understand these responsibilities?</h5>
                            <ol className={styles.order_list}>
                                <li>
                                    Decide how the website should look based on
                                    reference websites.
                                </li>
                                <li>
                                    Research a theme as per the client's
                                    instructions.
                                </li>
                                <li>
                                    Research a plugin according to the client's
                                    overall direction.
                                </li>
                                <li>Choose the colors for the website.</li>
                                <li>
                                    Talk to support teams like Shopify, theme,
                                    and plugin support when needed.
                                </li>
                                <li>
                                    Create or find tutorials as the client
                                    requests during or after a project.
                                </li>
                                <li>
                                    Recognize how crucial these tasks are for
                                    the project's success. They are your
                                    responsibility because you directly interact
                                    with the client. If you assign them to
                                    developers, you're neglecting your core role
                                    and risking the project.
                                </li>
                            </ol>

                            <p className="ml-2">
                                In general, defining requirements is your job.
                                Developers focus on executing detailed tasks
                                based on those requirements. If you need
                                developer help with any of these tasks, you must
                                get top management's approval for separate
                                tasks.
                            </p>

                            <p className="ml-2">
                                Assigning these tasks without proper approval
                                may lead to negative performance reviews if the
                                technical team reports it.
                            </p>

                            <div className={styles.footer_label}>
                                # Based on these principles, please select one
                                of the options below:
                            </div>
                            <div className={styles.form_group}>

                                <div className={styles.radio_group}>
                                    <input
                                        type="radio"
                                        name="statement"
                                        value="This is a routine task that falls within
                                        the responsibilities of the development
                                        team."
                                        onChange={ e => {
                                          setIsVisible(false);
                                          handleChange(e, {
                                          text: "This is a routine task that falls within the responsibilities of the development team.",
                                          authorization: false,
                                        })}}
                                    />
                                    <label>
                                        This is a routine task that falls within the responsibilities of the development team.
                                    </label>
                                </div>

                                <div className={styles.radio_group}>
                                    <input
                                        type="radio"
                                        name="statement"
                                        onChange={e => {
                                          setIsVisible(true);
                                          handleChange(e, {
                                            text: 'This is inherently my responsibility, but I would like to involve the technical team for the following reasons:',
                                            authorization: true,
                                          })
                                        }}
                                    />
                                    <label>
                                      This is inherently my responsibility, but I would like to involve the technical team for the following reasons:
                                    </label>
                                </div>


                                  <div className="pl-3 mt-2">
                                      <div className={styles.radio_group}>
                                          <input
                                              type="radio"
                                              disabled={!visible}
                                              name="subStatement"
                                              onChange={e =>  handleSubChange(e, {
                                                text: "It's highly technical, beyond my expertise.",
                                                authorization: true,
                                              })}
                                          />
                                          <label>
                                              It's highly technical, beyond my expertise.
                                          </label>
                                      </div>

                                      <div className={styles.radio_group}>
                                          <input
                                              type="radio"
                                              disabled={!visible}
                                              name="subStatement"
                                              onChange={e =>  handleSubChange(e, {
                                                text: "I don't fully understand the client's instructions, and I believe developers can interpret them better.",
                                                authorization: true,
                                              })}
                                          />
                                          <label>
                                              I don't fully understand the client's instructions, and I believe developers can interpret them better.
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
