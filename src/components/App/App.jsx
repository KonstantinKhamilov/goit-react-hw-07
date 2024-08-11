import { Provider } from "react-redux";
import store from "../../redux/store";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
