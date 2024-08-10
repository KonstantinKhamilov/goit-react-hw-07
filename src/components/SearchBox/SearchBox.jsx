import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/filtersSlice.js";

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      Фильтр:
      <input type="text" value={filter} onChange={handleFilterChange} />
    </label>
  );
};

export default SearchBox;
