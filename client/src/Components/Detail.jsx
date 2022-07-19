import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, getDetails } from "../State/actions";
import "../Styles/Detail.css";

export const Detail = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const food = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  function handleDelete() {
    dispatch(deleteRecipe(id));
    history("/home");
  }

  return (
    <div className="wall">
      <div className="father">
        <div className="top">
          <h1 className="title2">Learn to make your recipe</h1>
          <img src={food.image} height="350" alt="" />
          <h2>{food.title?.toUpperCase()}</h2>
          <h3>
            Diets
            {food.diets?.map((diet, index) => {
              return (
                <span key={index}>
                  {diet.name?.charAt(0).toUpperCase() +
                    diet.name.substr(1) +
                    " "}
                </span>
              );
            })}
          </h3>
          <div className="ubi">
            <Link to="/home">
              <button className="btnReturn">Return</button>
            </Link>
            <button onClick={() => handleDelete()} className="btnReturn">
              Delete
            </button>
          </div>
        </div>
        <div>
          <div className="background">
            <div className="names">
              <h2>Steps:</h2> <br />
              <div className="detailsFood">
                {food.steps?.map((ele, index) => {
                  return (
                    <div key={index}>
                      {index + 1 + "-"}
                      {ele}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="names">
              <h2>
                Summary: <br />{" "}
              </h2>
              <div className="detailsFood">
                {food.summary?.replaceAll(/<\/?[^>]+(>|$)/g, "")}
              </div>
            </div>
            <h2 className="names">HealhtScore: {food.healthScore}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
