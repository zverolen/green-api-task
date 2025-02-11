import { useState } from "react"

interface AddNumberFormProps {
  onSubmit: (contactPhone: string) => void;
}

const AddNumberForm = ({ onSubmit }: AddNumberFormProps) => {

  const [ contactNumber, setContactNumber ] =useState<string>('')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContactNumber(event.currentTarget.value)
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const trimmedNumber = contactNumber[0] === "+" ? contactNumber.trim().slice(1) : contactNumber.trim()

    if (trimmedNumber.length < 7 || trimmedNumber.length > 15) {
      alert("The phone number should be between 7 and 15 digits")
      return
    }

    if (contactNumber !== '') {
      onSubmit(contactNumber)
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="contactNumber">Add Phone Number (only digits)</label>
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
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default AddNumberForm