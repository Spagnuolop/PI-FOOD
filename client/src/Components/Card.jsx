import React from "react";
import "../Styles/Card.css";

export default function Card({ title, image, id, diets }) {
  return (
    <div className="container">
      <img className="img" height="254" width="343" src={image} alt={title} />
      <h2>{title.charAt(0).toUpperCase() + title.substr(1)}</h2>
      <div className="diets">
        {diets?.map((diet, index) => {
          return (
            <div key={index}>
              <span>
                {(
                  diet.name.charAt(0).toUpperCase() + diet.name.substr(1)
                ).trim()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
