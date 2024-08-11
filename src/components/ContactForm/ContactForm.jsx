import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, fetchContacts } from "../../redux/contactsOps";
import css from "../ContactList/contact.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { name, number };
      const contacts = await dispatch(fetchContacts());
      const existingContact = contacts.payload.find(
        (item) =>
          item.name === newContact.name && item.phone === newContact.phone
      );
      if (!existingContact) {
        await dispatch(addContact(newContact));
        setName("");
        setNumber("");
        setError(null);
      } else {
        setError("Контакт с таким именем и номером телефона уже существует!");
      }
    } catch (error) {
      console.log("Error caught:", error);
      setError(error.message);
    }
  };

  console.log("Error state:", error);

  return (
    <form onSubmit={handleSubmit}>
      <label className={css}>
        Имя:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={css}>
        Номер телефона:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ContactForm;
