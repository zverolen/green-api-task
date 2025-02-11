import { MessageType } from "../../types/types";

import style from "./Message.module.css"

type MessageProps = MessageType

const Message = ( {text, time, type, id}: MessageProps ) => {
  return (
    <div key={id} className={`${type} ${style.message}`}>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  )
}

export default Message