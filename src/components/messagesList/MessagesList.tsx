import Message from "../message/Message"
import MessageInput from "../messageInput/MessageInput"

import style from "./MessagesList.module.css"

const MessagesList = () => {
  return (
    <div className={style.messagesList}>
      <div>
        <Message text="What a nice weather" time="14:05" type="received" />
        <Message text="I like it too" time="14:06" type="sent" />
      </div>
      <MessageInput />
    </div>
  )
}

export default MessagesList