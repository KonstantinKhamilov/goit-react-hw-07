import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../../redux/contactsSlice";

const Contact = ({ id }) => {
  const contact = useSelector((state) =>
    state.contacts.items.find((contact) => contact.id === id)
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li>
      <span>{contact.name}</span>
      <span>{contact.number}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Contact;
