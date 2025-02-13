import { useState } from "react"

import style from "./LoginForm.module.css"

interface LoginFormProps {
  onSubmit: (data: { idInstance: string; apiTokenInstance: string }) => void;
}

const LoginForm = ( { onSubmit }: LoginFormProps ) => {
  const [ idInstance, setIdInstance ] = useState<string>('')
  const [ apiTokenInstance, setApiTokenInstance ] = useState<string>('')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.currentTarget.id) {
      case 'idInstance':
        setIdInstance(event.currentTarget.value)
        break
      default:
        setApiTokenInstance(event.currentTarget.value)
    }
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {

    const trimmedId = idInstance.trim()
    const trimmedToken = apiTokenInstance.trim()

    event.preventDefault()

    if (trimmedId.length !== 10) {
      alert("Ваш idInstance должен содержать 10 цифр")
      return
    }

    if (trimmedToken.length !== 50 || !/^[a-z0-9]+$/.test(trimmedToken)) {
      alert("Ваш apiTokenInstance не подходит")
      return
    }

    onSubmit({
      idInstance: trimmedId,
      apiTokenInstance: trimmedToken,
    })
    
  }

  return (
    <div className={style.loginFormContainer} >
      <form>
        <div>
          <label htmlFor="idInstance">Ваш idInstance (обязательно)</label>
          <input id="idInstance" type="number" required value={idInstance} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="apiTokenInstance">Ваш apiTokenInstance (обязательно)</label>
          <input id="apiTokenInstance" type="text" required value={apiTokenInstance} onChange={handleInputChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>Применить</button>
      </form>
    </div>
  )
}

export default LoginForm