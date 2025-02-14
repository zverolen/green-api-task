import Contact from '../contact/Contact'
import style from './ContactsList.module.css'

interface ContactsListProps {
  contactNumber: string;
}

const ContactsList = ({ contactNumber }: ContactsListProps) => {
 return (
  <aside className={style.contactsList}>
    <div aria-hidden="true"></div>
    <div>
      <div className={style.contactsListHeader}>
        <h1>Chats</h1>
      </div>
      <div>
        <Contact phoneNumber={`+${contactNumber}`} isActive={true} />
      </div>
    </div>
  </aside>
 )
}

export default ContactsList