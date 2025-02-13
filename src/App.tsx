import { useState } from "react"

import ContactNumberForm from "./components/contactNumberForm/contactNumberForm"
import LoginForm from "./components/loginForm/LoginForm"
import ContactsList from "./components/contactsList/contactsList"
import Chat from "./components/chat/Chat"

import { GlobalStateType } from "./types/types"

function App() {

  // The state structure is simple and I decided to avoid nesting
  const [ globalState, setGlobalState ] = useState<GlobalStateType>({
    idInstance: '',
    apiTokenInstance: '',
    contactNumber: '',
    screen: 'loginForm'
  })

  // I have only a few screens and I decided to keep switching between them simple and not use routing
  let content

  switch (globalState.screen) {
    case 'contactForm':
      content = <ContactNumberForm onSubmit={handleContactNumberUpdate} />
      break
    case 'chat':
      content = <div className="app">
            <ContactsList contactNumber={globalState.contactNumber} />
            <Chat 
              idInstance={globalState.idInstance} 
              apiTokenInstance={globalState.apiTokenInstance}
              contactNumber={globalState.contactNumber} 
              />
        </div>
      break
    default:
      content = <LoginForm onSubmit={handleCredentialsSubmit} />
  }
  
  function handleCredentialsSubmit(data: { idInstance: string; apiTokenInstance: string }) {
    setGlobalState({
      ...globalState,
      idInstance: data.idInstance,
      apiTokenInstance: data.apiTokenInstance,
      screen: 'contactForm'
    })
  }

  function handleContactNumberUpdate(contactNumber: string) {
    setGlobalState({
      ...globalState,
      contactNumber: contactNumber,
      screen: 'chat'
    })
  }

  return (
    <>
      {content}
    </>
  )
}

export default App
