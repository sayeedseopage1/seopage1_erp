import React from 'react';
import { dummy_messages } from '../../../constants/message';
import ChatMessage from './ChatMessage';

const ChatContents = () => {

    const currentUserId = dummy_messages?.result.current_user_id;
    const messages = dummy_messages?.result?.messages;
    const users = dummy_messages?.result?.users;

    return (
        <div className="chat-contents">
            {
                messages?.map((message) => {
                    const user = users[message?.from_user];
                    if (message?.from_user === currentUserId) {
                        return (
                            <ChatMessage
                                key={message?.id}
                                message={message}
                                user={user}
                                isRight={true}
                            />
                        )
                    } else {
                        return (
                            <ChatMessage
                                key={message?.id}
                                message={message}
                                user={user}
                                isRight={false}
                            />
                        )
                    }
                })
            }
        </div>
    );
};

export default ChatContents;