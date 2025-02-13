import { useState } from "react"

import { arrowIcon } from "../../svg/svg"

import { MessageType } from "../../types/types"

import style from "./ChatMessageIntput.module.css"

interface ChatMessageInputProps {
  idInstance: string;
  apiTokenInstance: string;
  contactNumber: string;
  onSend: (newMessage: MessageType) => void;
}

const ChatMessageInput = ({ onSend, idInstance, apiTokenInstance, contactNumber }: ChatMessageInputProps ) => {

  const [ message, setMessage ] = useState('')

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value)
  }

  const sendMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const url = `https://7105.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

    try {
     
      const response  = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: `${contactNumber}@c.us`,
          message: message
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // console.log(result)
      onSend({
        text: message,
        time: "00:00",
        type: "sent",
        id: result.idMessage
      })
      setMessage("")
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Сообщение не было отправлено. Попробуйте ещё раз.') 
    }
  }
  return (
    <div className={style.chatMessageInput}>
      <form>
        <label htmlFor="messageInput" className="visually-hidden">Message Input</label>
        <input onChange={handleInput} id="messageInput" type="text" value={message} />
        <button onClick={sendMessage} type="submit">
          {arrowIcon}
        </button>
      </form>
    </div>
  )
}

export default ChatMessageInput