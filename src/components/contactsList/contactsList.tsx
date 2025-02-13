import Contact from '../contact/Contact'

import style from './ContactsList.module.css'

interface ContactsListProps {
  contactPhone: string;
}

const ContactsList = ({ contactPhone }: ContactsListProps) => {
 return (
  <aside className={style.contactsList}>
    <div aria-hidden="true"></div>
    <div>
      <div className={style.contactsListHeader}>
        <h1>Chats</h1>
      </div>
      <div>
        <Contact phoneNumber={`+${contactPhone}`} isActive={true} />
      </div>
    </div>
  </aside>
 )
}

export default ContactsList