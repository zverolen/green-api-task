import style from './Contact.module.css'

interface ContactProps {
  phoneNumber: string;
  lastMessage?: string;
}

const Contact = ( {phoneNumber, lastMessage }: ContactProps) => {
  return (
    <div className={style.contact}>
      <p>{phoneNumber}</p>
      <p>{lastMessage ? lastMessage : 'No message'}</p>
    </div>
  )
}

export default Contact