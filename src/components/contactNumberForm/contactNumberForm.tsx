import { useState } from "react"

import style from "./ContactNumberForm.module.css"

interface ContactNumberFormProps {
  onSubmit: (contactNumber: string) => void;
}

const ContactNumberForm = ({ onSubmit }: ContactNumberFormProps) => {

  const [ contactNumber, setContactNumber ] =useState<string>('')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContactNumber(event.currentTarget.value)
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const trimmedNumber = contactNumber[0] === "+" ? contactNumber.trim().slice(1) : contactNumber.trim()

    if (trimmedNumber.length < 7 || trimmedNumber.length > 15) {
      alert("Номер должен содержать от 7 до 15 цифр")
      return
    }

    if (contactNumber !== '') {
      onSubmit(contactNumber)
    }
  }

  return (
    <div className={style.contactNumberFormContainer}>
      <form>
        <label htmlFor="contactNumber">Номер телефона (только цифры)</label>
        <input 
          id="contactNumber" 
          type="number"
          placeholder="00000000000"
          min="7"
          max="15"
          required
          value={contactNumber} 
          onChange={handleInputChange} 
        />
        <button type="submit" onClick={handleSubmit}>Использовать</button>
      </form>
    </div>
  )
}

export default ContactNumberForm