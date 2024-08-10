import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice.js";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Номер телефона:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ContactForm;
