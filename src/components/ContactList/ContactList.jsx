import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice.js";
import css from "./contact.module.css";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.filters.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.contactlistUl}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => dispatch(deleteContact(contact.id))}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
