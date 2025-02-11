import { MessageType } from "../../types/types"

import { useState, useEffect } from "react"

import Message from "../message/Message"
import MessageInput from "../messageInput/MessageInput"

import style from "./MessagesList.module.css"

interface MessageListType {
  idInstance: string;
  apiTokenInstance: string;
  contactPhone: string;
}

const MessagesList = ({ idInstance, apiTokenInstance, contactPhone }: MessageListType) => {

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
          setChatMessages(prevMessages => [...prevMessages, {
            text: result.body.messageData.textMessageData.textMessage,
            time: "",
            type: "received",
            id: result.body.idMessage
          }])

          await fetch(`https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${result.receiptId}`, {
            method: 'DELETE',
            headers: {}
          })
        } 
      } catch (error) {
        console.error('Error receiving message:', error)
        alert('Failed to receive messages.')
      }
    }

    const intervalId = setInterval(receiveMessages, 5000)
    return () => clearInterval(intervalId)
  }, [apiTokenInstance, idInstance])

  let printedMessages
  let printedMessages2

  if (chatMessages.length > 0) {
    printedMessages = chatMessages.map((message: MessageType) => (
      <Message id={message.id} text={message.text} time="00:00" type={message.type}/>
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
    <div className={style.messagesList}>
      <div>
        {printedMessages}
        {printedMessages2}
      </div>

      {/* Props drilling seems to be acceptable since there are only 3 levels */}
      <MessageInput 
        onSend={handleUpdatingMessages} 
        idInstance={idInstance} 
        apiTokenInstance={apiTokenInstance} 
        contactPhone={contactPhone}
        />
    </div>
  )
}

export default MessagesList