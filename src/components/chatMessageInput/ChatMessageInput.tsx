import { useState, useRef } from 'react'
import { arrowIcon } from '../../svg/svg'
import { MessageType } from '../../types/types'
import style from './ChatMessageInput.module.css'

interface ChatMessageInputProps {
  idInstance: string;
  apiTokenInstance: string;
  contactNumber: string;
  onSend: (newMessage: MessageType) => void;
}

const maxMessageLength = 4096; // WhatsApp's maximum message length
const minMessageLength = 1;
const rateLimitMs = 1000; // 1 second between messages
const defaultTimeString = '00:00';

const ChatMessageInput = ({ onSend, idInstance, apiTokenInstance, contactNumber }: ChatMessageInputProps ) => {
  const [ message, setMessage ] = useState('')
  const lastSendTime = useRef<number>(0)

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    // Basic XSS prevention by removing potentially dangerous characters
    const sanitizedValue = value.replace(/[<>]/g, '')
    
    if (sanitizedValue.length > maxMessageLength) {
      alert(`Сообщение не может быть длиннее ${maxMessageLength} символов`)
      return
    }

    setMessage(sanitizedValue)
  }

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const trimmedMessage = message.trim()
    
    if (trimmedMessage.length < minMessageLength) {
      alert('Сообщение не может быть пустым')
      return
    }

    // Rate limiting
    const now = Date.now()
    if (now - lastSendTime.current < rateLimitMs) {
      alert('Пожалуйста, подождите секунду перед отправкой следующего сообщения')
      return
    }

    const url = `https://7105.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

    try {
      const timestamp = Date.now() / 1000
      const response  = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: `${contactNumber}@c.us`,
          message: trimmedMessage
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      onSend({
        text: trimmedMessage,
        time: defaultTimeString,
        type: 'sent',
        id: result.idMessage,
        timestamp: timestamp
      })
      
      setMessage('')
      lastSendTime.current = now
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Сообщение не было отправлено. Попробуйте ещё раз.')
    }
  }
  
  return (
    <div className={style.chatMessageInput}>
      <form onSubmit={sendMessage}>
        <label htmlFor="messageInput" className="visually-hidden">Message Input</label>
        <input 
          onChange={handleInput} 
          id="messageInput" 
          type="text" 
          value={message}
        />
        <button type="submit" aria-label="Send message">
          <div aria-hidden="true">
            {arrowIcon}
          </div>
        </button>
      </form>
    </div>
  )
}

export default ChatMessageInput