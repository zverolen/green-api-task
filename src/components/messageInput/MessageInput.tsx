import { useState } from "react"

import { MessageType } from "../../types/types";

import style from "./MessageIntput.module.css"

interface MessageInputProps {
  idInstance: string;
  apiTokenInstance: string;
  contactPhone: string;
  onSend: (newMessage: MessageType) => void;
}

const MessageInput = ({ onSend, idInstance, apiTokenInstance, contactPhone }: MessageInputProps ) => {

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
          chatId: `${contactPhone}@c.us`,
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
      alert('Failed to send message. Please try again.') 
    }
  }
  return (
    <div className={style.messageInput}>
      <label htmlFor="messageInput" className="visually-hidden">Message Input</label>
      <input onChange={handleInput} id="messageInput" type="text" value={message} />
      <button onClick={sendMessage} type="submit">Ok</button>
    </div>
  )
}

export default MessageInput