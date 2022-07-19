import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, newRecipe } from "../State/actions";
import validaciones from "./CreateRecipeError";
import { Link } from "react-router-dom";
import "../Styles/CreateRecipe.css";

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets1 = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [cantSteps, setCantSteps] = useState(1);
  const [step, setStep] = useState([]);
  const [Finalstep, setFinalStep] = useState([]);
  const [data, setData] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    image: "",
    steps: [],
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function CheckButton() {
    if (!validaciones()) {
      return false;
    }
    if (validaciones()) {
      return true;
    }
  }

  function handlesetCantSteps(e) {
    setCantSteps(e.target.value);
  }

  function handleStep(e) {
    e.preventDefault();
    let arr = [];
    for (let i = 0; i < cantSteps; i++) {
      arr.push(i + 1);
    }
    setStep(arr);
  }
  function handleStepInArray(e) {
    let arr = Finalstep;
    arr[e.target.name - 1] = e.target.value;
    setFinalStep(arr);
  }

  function handleInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors(validaciones(e.target.name, e.target.value, errors));
  }

  function handleSubmit(e) {
    e.preventDefault();
    data.steps = Finalstep;
    dispatch(newRecipe(data));
    alert("Recipe created successfully");
  }

  const addType = (diet) => {
    if (data.diets.includes(diet)) {
      setData({
        ...data,
        diets: data.diets.filter((e) => e !== diet),
      });
    } else {
      setData({
        ...data,
        diets: [...data.diets, diet],
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="create">
        <div className="ubiTitle">
          <h1 className="titleCreate">Make your Recipe</h1>
        </div>
        <div className="cards">
          <div className="content">
            <div className="div">
              <label className="bars">Title:</label>
              <input
                className="input"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="text"
                name="title"
                value={data.title}
              />
            </div>
            {errors.title && <p className="errorinput">{errors.title}</p>}
            <div className="div">
              <label className="bars">Summary:</label>
              <input
                className="input"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="text"
                value={data.summary}
                name="summary"
              />
            </div>
            {errors.summary && <p className="errorinput">{errors.summary}</p>}
            <div className="div">
              <label className="bars">HealthScore:</label>
              <input
                className="input"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="number"
                value={data.healthScore}
                name="healthScore"
              />
            </div>
            {errors.healthScore && (
              <p className="errorinput">{errors.healthScore}</p>
            )}
            <div className="div">
              <label className="bars">Image:</label>
              <input
                className="input"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="url"
                value={data.image}
                name="image"
              />
            </div>
            {errors.image && <p className="errorinput">{errors.image}</p>}
          </div>
          <div className="div">
            <label className="bars">
              Number of steps your recipe will have:
            </label>
            <input
              className="input"
              type="number"
              name="cantSteps"
              value={cantSteps}
              onChange={(e) => {
                handlesetCantSteps(e);
              }}
            />
            <button
              className="btnStep"
              onClick={(e) => {
                handleStep(e);
              }}
            >
              Send steps
            </button>
          </div>
          <div>
            {step.map((step, index) => (
              <div key={index}>
                <label className="step"> Step {step}: </label>
                <input
                  className="input"
                  type="text"
                  name={step}
                  onChange={(e) => {
                    handleStepInArray(e);
                  }}
                />
              </div>
            ))}
          </div>
          {errors.steps && <p className="errorinput">{errors.steps}</p>}
          <div className="div">
            <label className="bars">Diets:</label>
            {diets1.map((ele, index) => {
              return (
                <button
                  className={
                    data.diets.includes(ele.id) ? "btnSelect" : "btnDiet"
                  }
                  key={index}
                  type="button"
                  onClick={() => addType(ele.id)}
                >
                  {ele.name}
                </button>
              );
            })}
          </div>
          <div>
            {!data.title ||
            !data.summary ||
            !data.healthScore ||
            errors.healthScore ||
            !data.image ||
            !data.steps ||
            !data.diets ? (
              <button className="btn2" type="submit" disabled={true}>
                Create Recipe
              </button>
            ) : (
              <button className="btn1" type="submit">
                Create Recipe
              </button>
            )}
          </div>
          <Link to="/home">
            <button className="btn1">Return</button>
          </Link>
        </div>
      </div>
    </form>
  );
};
