import { useState } from 'react'

interface ContactNumberFormProps {
  onSubmit: (contactNumber: string) => void;
}

interface FormError {
  contactNumber: string | null;
}

const maxPhoneLength = 15;
const minPhoneLength = 7;

const ContactNumberForm = ({ onSubmit }: ContactNumberFormProps) => {
  const [ contactNumber, setContactNumber ] = useState<string>('')
  const [ error, setError ] = useState<FormError>({ contactNumber: null })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    
    // Clear error when typing
    setError({ contactNumber: null })
    
    // ignore non-digit input
    if (!/^\d*$/.test(value)) {
      return 
    }
    
    setContactNumber(value)
    
    if (value.length > maxPhoneLength) {
      setError({ contactNumber: `Номер не может быть длиннее ${maxPhoneLength} цифр` })
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedNumber = contactNumber.trim()

    const newError: FormError = { contactNumber: null }

    if (trimmedNumber.length === 0) {
      newError.contactNumber = 'Укажите номер телефона'
    } else if (trimmedNumber.length < minPhoneLength) {
      newError.contactNumber = `Номер должен содержать минимум ${minPhoneLength} цифр`
    } else if (trimmedNumber.length > maxPhoneLength) {
      newError.contactNumber = `Номер не может быть длиннее ${maxPhoneLength} символов`
    }

    if (newError.contactNumber) {
      setError(newError)
      return
    }

    onSubmit(trimmedNumber)
  }

  function handleInputBlur() {
    const trimmedNumber = contactNumber.trim()

    // Only validate non-empty fields on blur
    if (trimmedNumber.length > 0 && trimmedNumber.length < minPhoneLength) {
      setError({ contactNumber: `Номер должен содержать минимум ${minPhoneLength} цифр` })
    }
  }

  return (
    <div className="loginFormContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className={error.contactNumber ? 'error' : ''}>
          <label htmlFor="contactNumber">Номер телефона <br/>(в формате 79991234567)</label>
          <input 
            id="contactNumber" 
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={contactNumber} 
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            aria-invalid={error.contactNumber ? 'true' : 'false'}
            aria-errormessage="contactNumberError"
          />
          <div id="contactNumberError" aria-live="polite">
            {error.contactNumber && <p>{error.contactNumber}</p>}
          </div>
        </div>
        <button type="submit">Применить</button>
      </form>
    </div>
  )
}

export default ContactNumberForm