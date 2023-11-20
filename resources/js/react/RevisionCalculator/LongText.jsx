import Popover from '../global/Popover';
import styles from './styles.module.css';

export const LongText = ({render, children}) => {
    return(
        <Popover>
            <Popover.Button> {children} </Popover.Button>
            <Popover.Panel>
                <div className={styles.revision_popover_panel}>
                    {render}
                </div>
            </Popover.Panel>
        </Popover>
    )
}
