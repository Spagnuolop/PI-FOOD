import React from "react";
import Button from "../images/dos.png";
import "../Styles/Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <h1 className="title">Welcome to your cookbook</h1>
      <img className="images" src={Button} alt="" height="400" />
      <a href="/home" className="ubiBtn">
        <button className="btn">Enter</button>
      </a>
    </div>
  );
}
