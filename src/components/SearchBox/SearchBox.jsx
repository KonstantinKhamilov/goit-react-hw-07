import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/contactsSlice";

const SearchBox = () => {
  const filter = useSelector((state) => state.contacts.filter || "");
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    dispatch(changeFilter(newFilter));
  };

  return (
    <label htmlFor="filter-input">
      Фильтр:
      <input
        id="filter-input"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </label>
  );
};

export default SearchBox;
