import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchContacts, deleteContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import css from "./contact.module.css";

function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactsAsync = async () => {
      try {
        setLoading(true);
        await dispatch(fetchContacts());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchContactsAsync();

    const handleBlur = () => {
      dispatch({ type: "RESET_FILTER" }); // сброс фильтра
    };
    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [dispatch]);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

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
