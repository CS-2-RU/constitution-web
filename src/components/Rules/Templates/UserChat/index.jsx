import React from "react";

const UserChat = ({content, headline = "Пример диалога:"}) => {
    // const content = [
    //     ['user-a', 'User A', 'message there', 'description'],
    //     ['user-b', 'User B', 'message there 2', null],
    //     ['user-a', 'User A', 'message there 3', 'description'],
    // ]

    return (
        <div className="rule-chat-example">
            <span className="rule-example-headline" dangerouslySetInnerHTML={{ __html: headline }} />
            {content.map(message => (
                <div className={`rule-chat-message-container`}>
                    <span className={`rule-chat-user ${message[0]}`}>{message[1]}:</span>
                    <span className={`rule-chat-message`} dangerouslySetInnerHTML={{ __html: message[2] }} />
                    {message[3] && <span className="rule-chat-description">- {message[3]}</span>}
                </div>
            ))}
        </div>
    )
}

export default UserChat;