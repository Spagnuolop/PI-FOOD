import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllFoods, getDiets } from "../State/actions";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Card from "./Card";
import "../Styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrdered] = useState("Asc");
  const [diet, setDiets] = useState("All");
  const [health, setHealth] = useState("");
  const { foods } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage] = useState(9);
  var lastRecipe = currentPage * recipePerPage;
  var firstRecipe = lastRecipe - recipePerPage;
  var currentRecipes = foods.slice(firstRecipe, lastRecipe);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
    lastRecipe = currentPage * recipePerPage;
    firstRecipe = lastRecipe - recipePerPage;
    currentRecipes = foods.slice(firstRecipe, lastRecipe);
  }, [foods]);

  useEffect(() => {
    dispatch(getAllFoods("All", "Asc"));
    dispatch(getDiets());
  }, [dispatch]);

  function handleFilterDiet(e) {
    setDiets(e.target.value);
    dispatch(getAllFoods(e.target.value, order));
  }

  function handleSort(e) {
    setOrdered(e.target.value);
    dispatch(getAllFoods(diet, e.target.value));
    setCurrentPage(1);
  }

  function handleHealth(e) {
    setHealth(e.target.value);
    dispatch(getAllFoods(diet, order, e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="home">
      <h1 className="title1">Learn and create your own recipes</h1>
      <div>
        <Link className="linkBtn" to="/Createrecipe">
          <button className="btnHome">Make your recipe</button>
        </Link>
        <SearchBar />
        <div>
          <Paginado
            recipePerPage={recipePerPage}
            recipes1={foods.length}
            paginado={paginado}
            page={currentPage}
          />
        </div>
        <div>
          <p className="p">
            Order by name:
            <select className="options" onChange={(e) => handleSort(e)}>
              <option className="options" value="Asc">
                Ascending
              </option>
              <option className="options" value="desc">
                Descending
              </option>
            </select>
          </p>
          <p className="p">
            Order by Health
            <select className="options" onChange={(e) => handleHealth(e)}>
              <option className="options" value="Asc">
                Ascending
              </option>
              <option className="options" value="desc">
                Descending
              </option>
            </select>
          </p>
          <p className="p">
            Order by Diet:
            <select className="options" onChange={(e) => handleFilterDiet(e)}>
              <option className="options" value="All">
                All diets
              </option>
              <option className="options" value="gluten free">
                Gluten free
              </option>
              <option className="options" value="dairy free">
                Dairy free
              </option>
              <option className="options" value="vegan">
                Vegan
              </option>
              <option className="options" value="lacto ovo vegetarian">
                Lacto ovo vegetarian
              </option>
              <option className="options" value="fodmap friendly">
                Fodmap friendly
              </option>
              <option className="options" value="pescatarian">
                Pescatarian
              </option>
              <option className="options" value="paleolithic">
                Paleolithic
              </option>
              <option className="options" value="primal">
                Primal
              </option>
              <option className="options" value="whole 30">
                Whole 30
              </option>
            </select>
          </p>
        </div>
        <div className="card">
          {currentRecipes?.map((element, index) => {
            return (
              <div key={index}>
                <Link className="linkCard" to={`/details/${element.id}`}>
                  <Card
                    title={element.title}
                    image={element.image}
                    diets={element.diets}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <Paginado
            recipePerPage={recipePerPage}
            recipes1={foods.length}
            paginado={paginado}
            page={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
