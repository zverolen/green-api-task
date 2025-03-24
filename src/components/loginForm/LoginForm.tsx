import { useState } from 'react'
import { getTrimmedValues } from '../../utils/utils'

interface LoginFormProps {
  onSubmit: (data: { idInstance: string; apiTokenInstance: string }) => void;
}

interface FormErrors {
  idInstance: string | null;
  apiTokenInstance: string | null;
}

const LoginForm = ( { onSubmit }: LoginFormProps ) => {
  const [ idInstance, setIdInstance ] = useState<string>('')
  const [ apiTokenInstance, setApiTokenInstance ] = useState<string>('')
  const [ errors, setErrors ] = useState<FormErrors>({
    idInstance: null,
    apiTokenInstance: null
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const field = event.currentTarget.id
    const value = event.currentTarget.value

    // Clear error for the field being edited
    setErrors(prev => ({
      ...prev,
      [field]: null
    }))

    switch (field) {
      case 'idInstance':
        if (!/^\d*$/.test(value)) {
          return // ignore non-digit input
        }
        setIdInstance(value)
        if (value.length > 10) {
          setErrors(prev => ({
            ...prev,
            idInstance: 'idInstance должен содержать 10 цифр'
          }))
        }
        break
      case 'apiTokenInstance':
        setApiTokenInstance(value)
        if (value.length > 50) {
          setErrors(prev => ({
            ...prev,
            apiTokenInstance: 'apiTokenInstance должен содержать 50 символов'
          }))
        } else if (value.length > 0 && !/^[a-z0-9]+$/.test(value)) {
          setErrors(prev => ({
            ...prev,
            apiTokenInstance: 'apiTokenInstance может содержать только строчные буквы и цифры'
          }))
        }
        break
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { idInstance: trimmedId, apiTokenInstance: trimmedToken } = getTrimmedValues({
      idInstance,
      apiTokenInstance
    })

    const newErrors: FormErrors = {
      idInstance: null,
      apiTokenInstance: null
    }

    // Required field validation
    if (trimmedId.length === 0) {
      newErrors.idInstance = 'Укажите ваш idInstance'
    } else if (trimmedId.length !== 10) {
      newErrors.idInstance = 'idInstance должен содержать 10 цифр'
    }

    if (trimmedToken.length === 0) {
      newErrors.apiTokenInstance = 'Укажите ваш apiTokenInstance'
    } else if (trimmedToken.length !== 50) {
      newErrors.apiTokenInstance = 'apiTokenInstance должен содержать 50 символов'
    } else if (!/^[a-z0-9]+$/.test(trimmedToken)) {
      newErrors.apiTokenInstance = 'apiTokenInstance может содержать только строчные буквы и цифры'
    }

    if (newErrors.idInstance || newErrors.apiTokenInstance) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      idInstance: trimmedId,
      apiTokenInstance: trimmedToken,
    })
  }

  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { idInstance: trimmedId, apiTokenInstance: trimmedToken } = getTrimmedValues({
      idInstance,
      apiTokenInstance
    })

    const field = event.target.id
    const newErrors = {
      ...errors,
      [field]: null
    }

    // Only validate non-empty fields on blur
    if (field === 'idInstance' && trimmedId.length > 0 && trimmedId.length !== 10) {
      newErrors.idInstance = 'idInstance должен содержать 10 цифр'
    }

    if (field === 'apiTokenInstance' && trimmedToken.length > 0) {
      if (trimmedToken.length !== 50) {
        newErrors.apiTokenInstance = 'apiTokenInstance должен содержать 50 символов'
      } else if (!/^[a-z0-9]+$/.test(trimmedToken)) {
        newErrors.apiTokenInstance = 'apiTokenInstance может содержать только строчные буквы и цифры'
      }
    }

    setErrors(newErrors)
  }

  return (
    <div className="loginFormContainer" >
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className={errors.idInstance ? 'error' : ''}>
          <label htmlFor="idInstance">Ваш idInstance (обязательно)</label>
          <input
            id="idInstance"
            type="text" 
            required 
            pattern="[0-9]{10}"
            value={idInstance}
            size={10}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            aria-invalid={errors.idInstance ? 'true' : 'false'}
            aria-errormessage="idInstanceError"
            />
            <div id="idInstanceError" aria-live="polite">
              {errors.idInstance && <p>{errors.idInstance}</p>}
            </div>
        </div>
        <div className={errors.apiTokenInstance ? 'error' : ''}>
          <label htmlFor="apiTokenInstance">Ваш apiTokenInstance <br/>(обязательно)</label>
          <input 
            id="apiTokenInstance" 
            type="password" 
            required 
            value={apiTokenInstance} 
            onChange={handleInputChange} 
            onBlur={handleInputBlur}
            aria-invalid={errors.apiTokenInstance ? 'true' : 'false'}
            aria-errormessage="apiTokenInstanceError"
          />
          <div id="apiTokenInstanceError" aria-live="polite">
            {errors.apiTokenInstance && <p>{errors.apiTokenInstance}</p>}
          </div>
        </div>
        <button type="submit">Применить</button>
      </form>
    </div>
  )
}

export default LoginForm