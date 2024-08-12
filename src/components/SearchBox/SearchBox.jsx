import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/contactsSlice";

const SearchBox = () => {
  const filter = useSelector((state) => state.contacts.filters.filter || "");
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const newFilter = e.target.value.toLowerCase();
    dispatch(changeFilter(newFilter));
  };

  const handleResetFilter = () => {
    dispatch(changeFilter(""));
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
      <button onClick={handleResetFilter}>Сбросить фильтр</button>
    </label>
  );
};

export default SearchBox;
