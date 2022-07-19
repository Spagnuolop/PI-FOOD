import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Styles/SearchBar.css";

export default function SearchBar() {
  const [title, setTitle] = useState("");
  const history = useNavigate();
  const { foods } = useSelector((state) => state);

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title !== "") {
      let reci = foods.filter(
        (recipe) => recipe.title.toLowerCase() === title.toLowerCase()
      );
      if (reci.length === 0) {
        alert("Recipe " + title + " not found");
      } else {
        history("/details/" + reci[0].id);
      }
    }
  }

  return (
    <form className="search">
      <div>
        <input
          className="inputSearch"
          type="text"
          value={title}
          placeholder="Recipe name..."
          onChange={(e) => handleChange(e)}
        ></input>
        <button
          className="btnSearch"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </div>
    </form>
  );
}
