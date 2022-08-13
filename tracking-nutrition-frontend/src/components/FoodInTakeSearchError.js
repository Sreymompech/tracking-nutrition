import React from "react";
import "./foodintakesearcherror.css";

const FoodInTakeSearchError = () => {
  return (
    <div className="intake-error-body">
      <div className="intake-error-container">
        <div className="box intake-error">
          <div className="intake-content-error">Oop! Error!!</div>
          <p className="intake-error-des1">No result found for your search!</p>
          <p className="intake-error-des2">
            Somthing went wrong. Let try it again!!!
          </p>
          <p className="intake-error-des3">Thank for visiting!!!</p>
        </div>
      </div>
    </div>
  );
};

export default FoodInTakeSearchError;
