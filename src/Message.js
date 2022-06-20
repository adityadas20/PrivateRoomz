import React from 'react'
import "./Message.css";
import Avatar from '@mui/material/Avatar';

function Message({ timestamp, user, message }) {
    // console.log("time: ", timestamp);
    // console.log("user: ", user);
    // console.log("message: ", message);
    return (
        <div className="message">
            <Avatar />
            <div className='message__info'>
                <h4>
                    {user.displayName}
                    <span className='message_timestamp'>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                {/* <p>Hello</p> */}
                <p> {message}</p>
            </div>
        </div>
    )
}

export default Message