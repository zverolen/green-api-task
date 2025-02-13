import style from './Contact.module.css'

interface ContactProps {
  phoneNumber: string;
  isActive: boolean;
}

const Contact = ( {phoneNumber, isActive }: ContactProps) => {
  const contactClass = isActive ? style.contact_active : style.contact
  return (
    <div className={contactClass}>
      <p>{phoneNumber}</p>
    </div>
  )
}

export default Contact