import { MessageType } from '../../types/types'
import style from './ChatMessage.module.css'

interface ChatMessageProps extends MessageType {
  isFirst?: boolean;
}

const ChatMessage = ( {text, time, type, id, isFirst}: ChatMessageProps ) => {
  const chatMessageClass = type === 'sent' ? style.chatMessageSent : style.chatMessageReceived
  const modifier = isFirst ? 'first' : ''
  return (
    <div key={id} className={`${chatMessageClass} ${modifier}`}>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  )
}

export default ChatMessage