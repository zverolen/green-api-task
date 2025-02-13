import { MessageType } from "../../types/types";

import style from "./ChatMessage.module.css"

interface ChatMessageProps extends MessageType {
  key: string;
}

const ChatMessage = ( {text, time, type, key}: ChatMessageProps ) => {

  const chatMessageClass = type === 'sent' ? style.chatMessageSent : style.chatMessageReceived

  return (
    // <div key={id} className={`${type} ${style.message}`}>
    <div key={key} className={chatMessageClass}>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  )
}

export default ChatMessage