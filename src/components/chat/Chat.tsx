import { MessageType } from "../../types/types"

import { useState, useEffect } from "react"

import ChatMessage from "../chatMessage/ChatMessage"
import ChatMessageInput from "../chatMessageInput/ChatMessageInput"

import style from "./Chat.module.css"

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

        const response = await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=10`, requestOptions)
        const result = await response.json()

        console.log(result)
  
        // if (!result) {
        //   return;
        // }

        if (result !== null) {
          setChatMessages(
            [...chatMessages, 
              {
                text: result.body.messageData.textMessageData.textMessage,
                time: "",
                type: "received",
                id: result.body.idMessage
              }
            ])

          await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.receiptId}`, {
            method: 'DELETE',
            headers: {}
          })
        } 
      } catch (error) {
        console.error('Error receiving message:', error)
        alert('Сообщение не было получено.')
      }
    }

    const intervalId = setInterval(receiveMessages, 5000)
    return () => clearInterval(intervalId)
  }, [apiTokenInstance, idInstance, chatMessages])

  let printedMessages

  if (chatMessages.length > 0) {
    printedMessages = chatMessages.map((message: MessageType) => (
      <ChatMessage id={message.id} key={message.id} text={message.text} time="00:00" type={message.type}/>
    ))
  }

  function handleUpdatingMessages(newMessage: MessageType) {
    setChatMessages([...chatMessages, {
      text: newMessage.text,
      time: newMessage.time,
      type: newMessage.type,
      id: newMessage.id
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

      <div>
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