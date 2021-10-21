import React from 'react'
import "./message.css"
import { format } from "timeago.js"

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://thumbs.dreamstime.com/z/tv-test-image-card-rainbow-multi-color-bars-geometric-signals-retro-hardware-s-minimal-pop-art-print-suitable-89603635.jpg" alt="" />
                <p className="messageText">{message.text}</p>
            </div> 
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
