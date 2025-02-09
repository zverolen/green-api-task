import style from "./MessageIntput.module.css"

const MessageInput = () => {
  return (
    <div className={style.messageInput}>
      <label htmlFor="messageInput" className="visually-hidden">Message Input</label>
      <input id="messageInput" type="text" />
      <button type="submit">Ok</button>
    </div>
  )
}

export default MessageInput