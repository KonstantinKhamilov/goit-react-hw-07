import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts, deleteContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import css from "./contact.module.css";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.contacts.filter || "");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const handleBlur = () => {
      dispatch({ type: "RESET_FILTER" }); // сброс фильтра
    };
    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul className={css.contactlistUl}>
      {filteredContacts.map((contact) => (
        <li className={css.contactListLi} key={contact.id}>
          {contact.name} - {contact.number}
          <button onClick={() => handleDeleteContact(contact.id)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
