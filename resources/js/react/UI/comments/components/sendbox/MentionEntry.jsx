import React from "react";
import Avatar from '../../../../global/Avatar';
import { User } from "../../utils/user-details";

const MentionEntry = (props) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
        isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...parentProps
    } = props;

 
    const user = new User(mention);  
 
  
    return (
        <div {...parentProps}>
            <div className={`${theme?.mentionSuggestionsEntryContainer}`}>
                <div className={theme?.mentionSuggestionsEntryContainerLeft}>
                    <Avatar
                      src={user?.image ? `/user-uploads/avatar/${user?.image}` : null}
                      name={user.name}
                      type="circle"
                      width={18}
                      height={18}
                    /> 
                </div>

                <div className={theme?.mentionSuggestionsEntryContainerRight}>
                    <div className={theme?.mentionSuggestionsEntryText}>
                        {mention.name}
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default MentionEntry;