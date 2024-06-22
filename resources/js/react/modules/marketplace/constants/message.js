export const dummy_messages = {
    status: "success",
    request_id: "req_12345",
    result: {
        current_user_id: 34567,
        messages: [
            {
                id: 1,
                from_user: 34567,
                thread_id: 78910,
                parent_id: 0,
                time_created: "2024-06-22 17:22:42",
                message:
                    "Hello Jane, I have completed the initial draft of the project. Please review and provide your feedback.",
                message_source: "chat_box",
                attachments: [
                    {
                        key: 1,
                        filename: "draft_v1.pdf",
                        message_id: 1,
                    },
                ],
                remove_reason: "nonfeatured",
                client_message_id: "msg_12345",
                quoted_message_id: 0,
                text_entities: [],
                message_rich_text: [],
                is_read: true,
            },
            {
                id: 2,
                from_user: 891011,
                thread_id: 78910,
                parent_id: 1,
                time_created: "2024-06-22 17:22:42",
                message:
                    "Thanks, Dinar! I'll review it and get back to you soon.",
                message_source: "chat_box",
                attachments: [],
                remove_reason: "nonfeatured",
                client_message_id: "msg_12346",
                quoted_message_id: 1,
                text_entities: [],
                message_rich_text: [],
                is_read: true,
            },
            {
                id: 3,
                from_user: 891011,
                thread_id: 78910,
                parent_id: 1,
                time_created: "2024-06-22 17:22:42",
                message:
                    "The draft looks good overall. However, could you please make some changes to the introduction section?",
                message_source: "chat_box",
                attachments: [],
                remove_reason: "nonfeatured",
                client_message_id: "msg_12347",
                quoted_message_id: 1,
                text_entities: [],
                message_rich_text: [],
                is_read: true,
            },
            {
                id: 4,
                from_user: 34567,
                thread_id: 78910,
                parent_id: 3,
                time_created: "2024-06-22 17:29:42",
                message:
                    "Sure, I can do that. I'll send the revised draft by tomorrow.",
                message_source: "chat_box",
                attachments: [],
                remove_reason: "nonfeatured",
                client_message_id: "msg_12348",
                quoted_message_id: 3,
                text_entities: [],
                message_rich_text: [],
                is_read: false,
            },
        ],
        threads: null,
        users: {
            34567: {
                user_id: 34567,
                name: "Dinar M Islam",
                image_url: "https://i.ibb.co/86SqH8x/user-profile.png",
            },
            891011: {
                user_id: 891011,
                name: "Jane Smith",
                image_url: "https://i.ibb.co/rvCgSyG/user-avatar-2.png",
            },
        },
    },
};

// const currentUserId = response.result.current_user_id;
// const messages = response.result.messages;
// const users = response.result.users;

// messages.forEach((message) => {
//     const user = users[message.from_user];
//     const profileImage = user.image_url;
//     if (message.from_user === currentUserId) {
//         console.log(
//             "Right side:",
//             message.message,
//             "Profile Image:",
//             profileImage
//         );
//     } else {
//         console.log(
//             "Left side:",
//             message.message,
//             "Profile Image:",
//             profileImage
//         );
//     }
// });
