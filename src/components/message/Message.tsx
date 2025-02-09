import style from "./Message.module.css"

interface MessageProps {
  text: string;
  time: string;
  type: 'received' | 'sent';
}

const Message = ( {text, time, type}: MessageProps ) => {
  return (
    <div className={`${type} ${style.message}`}>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  )
}

export default Message