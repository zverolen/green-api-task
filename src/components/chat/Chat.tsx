import { useState, useEffect } from 'react'
import ChatMessage from '../chatMessage/ChatMessage'
import ChatMessageInput from '../chatMessageInput/ChatMessageInput'
import { formatTime } from '../../utils/utils'
import { MessageType } from '../../types/types'
import style from './Chat.module.css'

interface ChatProps {
  idInstance: string;
  apiTokenInstance: string;
  contactNumber: string;
}

const Chat = ({ idInstance, apiTokenInstance, contactNumber }: ChatProps) => {
  const [ chatMessages, setChatMessages ] = useState<MessageType[]>([])

  useEffect(() => {
    const receiveMessages = async () => {
    
      try {
        const requestOptions = {
          method: 'GET'
        }

        const response = await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`, requestOptions)
        const result = await response.json()

        if (result !== null) {
          if (result.body.typeWebhook === 'incomingMessageReceived') {
            setChatMessages(c => [...c, {
              text: result.body.messageData.textMessageData.textMessage,
              time: '',
              type: 'received',
              id: result.body.idMessage,
              timestamp: result.body.timestamp
            }])
  
            await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.receiptId}`, {
              method: 'DELETE',
              headers: {}
            })
          } else {
            await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.receiptId}`, {
              method: 'DELETE',
              headers: {}
            })
          }
        }
      } catch (error) {
        console.error('Error receiving message:', error)
      }
    } 

    const intervalId = setInterval(receiveMessages, 1000)
    return () => clearInterval(intervalId)
  }, [apiTokenInstance, idInstance])

  useEffect(() => {
    const chatContainer = document.getElementById('chatMessages')

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
      console.log(chatContainer.scrollHeight)
    }
  }, [chatMessages])

  let printedMessages
  let typeKeeper = ''

  if (chatMessages.length > 0) {
    printedMessages = chatMessages.map((message: MessageType) => {
      if (message.type !== typeKeeper) 
        {
          typeKeeper = message.type
          return <ChatMessage 
            id={message.id} 
            text={message.text} 
            time={formatTime(message.timestamp ?? Date.now() / 1000)} 
            type={message.type}
            isFirst={true}
            timestamp={message.timestamp}
            key={message.id}
          />
        } else {
          return <ChatMessage 
          id={message.id} 
          text={message.text} 
          time={formatTime(message.timestamp ?? Date.now() / 1000)} 
          type={message.type}
          timestamp={message.timestamp}
          key={message.id}
        />
        }
    })
  }

  function handleUpdatingMessages(newMessage: MessageType) {
    setChatMessages([...chatMessages, {
      text: newMessage.text,
      time: newMessage.time,
      type: newMessage.type,
      id: newMessage.id,
      timestamp: newMessage.timestamp
    }])
  }

  return (
    <main className={style.chat}>
      <div>
        <h2>
          <span className="visually-hidden">Chat with number</span>
          <span>+{contactNumber}</span>
        </h2>
      </div>

      <div id="chatMessages" className={style.chatMessages}>
        {printedMessages}
      </div>

      {/* Props drilling seems to be acceptable since there are only 3 levels */}
      <ChatMessageInput 
        onSend={handleUpdatingMessages} 
        idInstance={idInstance} 
        apiTokenInstance={apiTokenInstance} 
        contactNumber={contactNumber}
        />
    </main>
  )
}

export default Chat