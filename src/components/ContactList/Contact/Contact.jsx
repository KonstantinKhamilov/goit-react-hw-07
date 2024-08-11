/*import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from "./contactsSlice";

function Contact() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleAddContact = async () => {
    const newContact = { name, number };
    await dispatch(addContact(newContact));
    setName("");
    setNumber("");
  };

  const handleDeleteContact = async (id) => {
    await dispatch(deleteContact(id));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Number"
      />
      <button onClick={handleAddContact}>Add Contact</button>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
*/
