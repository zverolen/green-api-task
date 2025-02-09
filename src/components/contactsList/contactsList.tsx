import Contact from '../contact/contact'

import style from './ContactsList.module.css'

const ContactsList = () => {
 return (
  <div className={style.contactsList}>
    <Contact phoneNumber="+000000000000" lastMessage="Hi" />
    <Contact phoneNumber="+11111111111" lastMessage="What's up" />
    <Contact phoneNumber="+22222222222" />
  </div>
 )
}

export default ContactsList